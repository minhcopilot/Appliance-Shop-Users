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
import { set } from "lodash";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendEmail = (data: any) => {
    setIsLoading(true);
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
            setIsLoading(false);
            setShowSuccessModal(true);
          }, 1000);

          form.reset();
        },
        (error) => {
          setIsLoading(false);
          alert("Gửi email thất bại! hãy thử lại sau!");
        }
      );
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-center">Thông tin liên hệ</h2>
      <div className="container flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Haven Miền Trung - Vận hành đơn hàng toàn quốc
            </h3>
            <p>Địa chỉ: 92/26 Thi Sách, Hoà Thuận Nam, Hải Châu, Tp. Đà Nẵng</p>
            {/* <p>Mã số thuế: 0401678723</p> */}
            <p className="mb-2">Email: baovuphan@gmail.com</p>
            <p className="mb-2">Hotline: 0905 3636 82</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Liên hệ với chúng tôi
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(sendEmail)}
                className="space-y-4"
              >
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
                <Button type="submit">
                  {isLoading ? <LoadingSpinner /> : "Gửi"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.5590150938768!2d108.2049022695628!3d16.053235499039015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219eaff15bfa9%3A0xdaa79eccaaa5e4ed!2zOTIgVGhpIFPDoWNoLCBIw7JhIFRodeG6rW4gTmFtLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1719500902515!5m2!1svi!2s"
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
    </>
  );
};

export default Contact;
