"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosClient, axiosServerNext } from "@/lib/axiosClient";
import { useAppContext } from "@/app/AppProvider";
import {
  RegisterBodyType,
  RegisterBody,
} from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SuccessModal from "@/components/ui/SuccessModal";
import ReCAPTCHA from "react-google-recaptcha";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setSessionToken, setUser } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const firstName = useWatch({ control: form.control, name: "firstName" });
  const lastName = useWatch({ control: form.control, name: "lastName" });
  const email = useWatch({ control: form.control, name: "email" });
  const phoneNumber = useWatch({ control: form.control, name: "phoneNumber" });
  const password = useWatch({ control: form.control, name: "password" });

  const handleCaptchaChange = (value: any) => {
    setIsCaptchaVerified(!!value);
  };

  const isFormValid =
    firstName &&
    lastName &&
    email &&
    phoneNumber &&
    password &&
    isCaptchaVerified;

  async function onSubmit(values: RegisterBodyType) {
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
      const result = await axiosClient.post("/user/auth/register", {
        ...values,
        recaptchaToken,
      });
      if (result.data) {
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
      }
    } catch (error: any) {
      const status = error.response.status;

      if (status == 400) {
        form.setError("email", {
          message: `Email đã tồn tại`,
        });
        toast({
          title: "Lỗi",
          description: "Email đã tồn tại!",
        });
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
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Nhập Email của bạn"
                    formNoValidate
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Nhập Số điện thoại của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập Mật khẩu của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ReCAPTCHA
          className="mt-3"
          ref={recaptchaRef}
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={handleCaptchaChange}
        />

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Đăng ký"}
        </Button>
        <div className="flex items-center justify-center my-3">
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
        <div className="flex mt-3 justify-center">
          <span>Bạn đã có tài khoản?</span>
          <Link href="/login" className="ms-1 text-yellow-500">
            Đăng nhập
          </Link>
        </div>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Đăng ký thành công!"
          content="Chào mừng bạn đến với cửa hàng của chúng tôi!"
        />
      </form>
    </Form>
  );
}
