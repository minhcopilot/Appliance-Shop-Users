"use client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/app/AppProvider";
import { axiosClient, axiosServerNext } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SuccessModal from "@/components/ui/SuccessModal";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { setSessionToken, setUser } = useAppContext();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = useWatch({ control: form.control, name: "email" });
  const password = useWatch({ control: form.control, name: "password" });

  const handleCaptchaChange = (value: any) => {
    setIsCaptchaVerified(!!value);
  };

  const isFormValid = email && password && isCaptchaVerified;

  async function onSubmit(values: LoginBodyType) {
    if (isLoading) return;
    setIsLoading(true);
    const recaptchaToken = await recaptchaRef.current?.getValue();
    recaptchaRef.current?.reset();

    if (!recaptchaToken) {
      toast({
        title: "Lỗi xác thực",
        description: "Vui lòng xác minh bạn không phải là robot!",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await axiosClient.post("/user/auth/login", {
        ...values,
        recaptchaToken,
      });

      const user = result.data.payload.data.customer;
      const token = result.data.payload.data.token;

      setUser(user);
      setSessionToken(token);

      // Gửi thông tin user và token tới API
      await axiosServerNext.post("/api/auth", { token, user });
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      const status = error.response?.status;
      if (status == 401) {
        form.setError("password", {
          message: `Email hoặc mật khẩu không chính xác!`,
        });
        form.setError("email", { message: `` });
      } else {
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = async (typeLogin: any) => {
    try {
      window.open(`http://localhost:9000/user/auth/${typeLogin}`, "_self");
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra!",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[380px] flex-shink-0 w-full rounded-lg shadow-md p-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  formNoValidate
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={handleCaptchaChange}
        />
        <Link href="/forgot-password" className="text-sm text-blue-700">
          Quên mật khẩu
        </Link>
        <Button
          type="submit"
          className="w-full"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Đăng nhập"}
        </Button>
        <div className="flex items-center justify-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 opacity-40">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            type="button"
            onClick={() => handleLogin("facebook")}
            className="w-full text-black bg-white border-2 border-black-600 hover:bg-slate-100 "
          >
            <FaFacebook size={20} color="blue" className="me-1" />
            Facebook
          </Button>
          <Button
            type="button"
            onClick={() => handleLogin("google")}
            className="w-full text-black bg-white border-2 border-black-600 hover:bg-slate-100"
          >
            <FcGoogle size={20} className="me-1" />
            Google
          </Button>
        </div>
        <div className="flex justify-center">
          <span>Bạn chưa có tài khoản?</span>
          <Link href="/register" className="text-yellow-500 ms-1">
            Đăng ký
          </Link>
        </div>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Đăng nhập thành công!"
          content="Chào mừng bạn đến với cửa hàng của chúng tôi!"
        />
      </form>
    </Form>
  );
}
