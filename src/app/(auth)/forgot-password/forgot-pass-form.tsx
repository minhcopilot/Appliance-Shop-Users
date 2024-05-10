"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import {
  ForgotPassBody,
  ForgotPassType,
} from "@/schemaValidations/auth.schema";
import { Input } from "@/components/ui/input";
import { axiosClient } from "@/lib/axiosClient";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export function ForgotPassForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<ForgotPassType>({
    resolver: zodResolver(ForgotPassBody),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPassType) {
    if (isLoading) return;
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const result = await axiosClient.post(
        "/user/auth/forgot-password",
        values
      );
      if (result.status === 200) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 404) {
        form.setError("email", { message: `Email chưa được đăng ký!` });
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

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <div className="space-y-2 max-w-[400px] flex-shink-0 w-full rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <ArrowLeft
              onClick={() => setIsSuccess(false)}
              className="mr-16 cursor-pointer"
            />
            <h2 className="text-center ">Yêu cầu đặt lại mật khẩu</h2>
          </div>
          <div className="flex justify-center">
            <img
              src="/icons8-email.gif"
              alt="Send email Icon"
              className="w-16 h-16"
            />
          </div>
          <p className="text-center">
            Mã xác minh đã được gửi đến địa chỉ email
            <br />
            <span className="text-yellow-500">{form.getValues("email")}</span>
            <br />
            Vui lòng xác minh.
          </p>
          <Button className="w-full" onClick={() => setIsSuccess(false)}>
            OK
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
            <Button type="submit" className="w-full">
              Xác nhận
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
