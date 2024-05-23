"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SuccessModal from "@/components/ui/SuccessModal";

const emailJSConfig = {
  serviceID: `${process.env.NEXT_PUBLIC_serviceID_1}`,
  templateID: `${process.env.NEXT_PUBLIC_templateID_1}`,
  publicKey: `${process.env.NEXT_PUBLIC_publicKey_1}`,
};

const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ." }),
});

const NewsletterSignup: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendEmail = (data: any) => {
    setIsLoading(true); // Bật trạng thái loading

    const templateParams = {
      reply_to: data.email,
    };

    emailjs
      .send(
        emailJSConfig.serviceID,
        emailJSConfig.templateID,
        templateParams,
        emailJSConfig.publicKey
      )
      .then(
        (result) => {
          setTimeout(() => {
            setShowSuccessModal(true);
            setIsLoading(false); // Tắt trạng thái loading
          }, 1000);

          form.reset();
        },
        (error) => {
          alert("Gửi email thất bại! hãy thử lại sau!");
          setIsLoading(false); // Tắt trạng thái loading
        }
      );
  };

  return (
    <div className="mt-16 bg-yellow-300 py-9">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <h3 className="text-2xl font-bold">Đăng ký nhận tin khuyến mãi</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendEmail)} className="flex">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nhập email của bạn"
                      className="px-4 py-2 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-yellow-500 ms-3 hover:bg-yellow-700 rounded-r-md"
              disabled={isLoading}
            >
              {isLoading ? "Đang gửi..." : "Đăng ký"}
            </Button>
          </form>
        </Form>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Đăng ký thành công"
        content="Cảm ơn bạn đã đăng ký nhận thông tin khuyến mãi!"
      />
    </div>
  );
};

export default NewsletterSignup;
