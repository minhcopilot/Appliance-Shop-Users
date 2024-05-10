"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

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

import { ResetPassBody, ResetPassType } from "@/schemaValidations/auth.schema";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<ResetPassType>({
    resolver: zodResolver(ResetPassBody),
    defaultValues: {
      password: "",
    },
  });
  //@ts-ignore
  const { token } = useParams<Params>();
  const decodedToken = decodeURIComponent(token);
  async function onSubmit(values: ResetPassType) {
    if (isLoading) return;
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const requestBody = {
        ...values,
        token: decodedToken,
      };
      const result = await axiosClient.put(
        "/user/auth/reset-password",
        requestBody
      );
      if (result.status === 200) {
        setIsSuccess(true);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 401) {
        form.setError("password", {
          message: `Thời gian đặt lại mật khẩu đã hết hạn!`,
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Thời gian đặt lại mật khẩu đã hết hạn!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  const redirectLogin = () => {
    router.push("/login");
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Thiết lập mật khẩu</h1>
      <div className="flex justify-center">
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess ? (
            <div className="space-y-2 max-w-[450px] flex-shink-0 w-full rounded-lg shadow-md p-6">
              <h2 className="text-center font-bold">
                Mật khẩu mới đã được đặt thành công
              </h2>
              <div className="flex justify-center">
                <img
                  src="/icons8-success.gif"
                  alt="Send email Icon"
                  className="w-16 h-16"
                />
              </div>
              <p className="text-center">
                Bạn đã thành công đặt lại mật khẩu cho tài khoản
                <br />
                Bạn sẽ được chuyển hướng đến trang Đăng nhập trong 1 giây
              </p>
              <Button className="w-full" onClick={redirectLogin}>
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 max-w-[400px] flex-shink-0 w-full rounded-lg shadow-md p-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu mới"
                          formNoValidate
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Xác nhận
                </Button>
              </form>
            </Form>
          )}
        </>
      </div>
    </div>
  );
}
