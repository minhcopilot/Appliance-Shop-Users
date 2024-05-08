"use client";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axiosClient from "@/lib/axiosClient";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function ForgotPassForm() {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const response = await axiosClient.post("/user/auth/login", values);
      if (response.data) {
        response.data.token &&
          localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status == 401) {
        form.setError("password", {
          message: `Tài khoản hoặc mật khẩu không chính xác!`,
        });
      } else {
        toast({
          title: "Lỗi",
          description: error.response.data.message,
        });
      }
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
        className="space-y-2 max-w-[300px] flex-shink-0 w-full"
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
        <Link href="/forgot-password" className="text-sm text-blue-700">
          Quên mật khẩu
        </Link>
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
        <Button type="submit" className="w-full !mt-10">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
