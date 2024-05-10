"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { axiosClient, axiosServerNext } from "@/lib/axiosClient";
import { useAppContext } from "@/app/AppProvider";
import {
  RegisterBodyType,
  RegisterBody,
} from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Link from "next/link";
export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { setSessionToken } = useAppContext();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const router = useRouter();

  // 1. Define your form.
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

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await axiosClient.post("/user/auth/register", values);
      if (result.data) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.payload.data.customer)
        );
        setUser(result.data.payload.data.customer);
        setSessionToken(result.data.payload.data.token);
        await axiosServerNext.post("/api/auth", result.data.payload.data.token);
        router.push("/");
      }
    } catch (error: any) {
      const status = error.response.status;

      if (status == 400) {
        form.setError("email", {
          message: `Email đã tồn tại`,
        });
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra!",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (typeLogin: any) => {
    try {
      window.open(`http://localhost:9000/user/auth/${typeLogin}`, "_self");
    } catch (error) {
      console.log("««««« error »»»»»", error);
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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

        <Button type="submit" className="w-full mt-6">
          Đăng ký
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
      </form>
    </Form>
  );
}
