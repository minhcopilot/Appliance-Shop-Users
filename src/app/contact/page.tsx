"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SuccessModal from "@/components/ui/SuccessModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const emailJSConfig = {
  serviceID: `${process.env.NEXT_PUBLIC_serviceID}`,
  templateID: `${process.env.NEXT_PUBLIC_templateID}`,
  publicKey: `${process.env.NEXT_PUBLIC_publicKey}`,
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  message: z
    .string()
    .min(10, { message: "Nội dung phải có ít nhất 10 ký tự." }),
});

const Contact: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendEmail = (data: any) => {
    const templateParams = {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
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
          }, 1000);

          form.reset();
        },
        (error) => {
          alert("Gửi email thất bại! hãy thử lại sau!");
        }
      );
  };

  return (
    <div className="container flex flex-col md:flex-row">
      <div className="p-6 md:w-1/2">
        <h2 className="mb-4 text-2xl font-bold">Thông tin liên hệ</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Haven Miền Trung - Vận hành đơn hàng toàn quốc
          </h3>
          <p>
            Địa chỉ: A4-27 Nguyễn Sinh Sắc, F. Hòa Minh, Q. Liên Chiểu, Tp. Đà
            Nẵng
          </p>
          <p>Mã số thuế: 0401678723</p>
          <p>Email: havenvn@gmail.com</p>
          <p>Hotline: 0989 27 47 27</p>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Liên hệ với chúng tôi</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendEmail)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormDescription>
                      Vui lòng nhập nội dung cần liên hệ.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Gửi liên hệ</Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="md:w-1/2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.771243008544!2d108.1614509749677!3d16.077356284603283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218dda9826097%3A0x9c12211bc84abdaa!2zQTQgTmd1eeG7hW4gU2luaCBT4bqvYywgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1716430428018!5m2!1svi!2s"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Gửi thành công "
        content="Cảm ơn bạn đã liên hệ với chúng tôi!"
      />
    </div>
  );
};

export default Contact;
