"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import {
  PasswordBodyType,
  PasswordBody,
} from "@/schemaValidations/password.schema";
import { axiosClient } from "@/lib/axiosClient";
import { useAppContext } from "@/app/AppProvider";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SuccessModal from "@/components/ui/SuccessModal";

const PasswordInput = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAppContext();
  const { toast } = useToast();
  const token = useAppContext().sessionToken;

  const form = useForm<PasswordBodyType>({
    resolver: zodResolver(PasswordBody),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;
  const newPassword = useWatch({ control: form.control, name: "newPassword" });
  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
  });

  const onSubmit = async (data: PasswordBodyType) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result: any = await axiosClient.patch(
        `/customers/change-password/${user?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setIsLoading(false);
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 400) {
        setIsLoading(false);
        form.setError("oldPassword", {
          message: `Mật khẩu cũ không chính xác!`,
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra, Vui lòng thử lại sau!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Đổi mật khẩu</h3>
      <p className="text-gray-600">
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="flex items-center w-full max-w-lg">
                <FormLabel className="text-gray-700 mr-4 text-end w-40">
                  Mật khẩu cũ:
                </FormLabel>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Mật khẩu cũ"
                      className="flex-1"
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="flex items-center w-full max-w-lg">
                <FormLabel className="text-gray-700 text-end mr-4 w-40">
                  Mật khẩu mới:
                </FormLabel>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Mật khẩu mới"
                      className="flex-1"
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex items-center w-full max-w-lg">
                <FormLabel className="text-gray-700 text-end mr-4 w-40">
                  Xác nhận mật khẩu:
                </FormLabel>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      className="flex-1"
                    />
                  </FormControl>
                  {newPassword !== confirmPassword && confirmPassword && (
                    <FormMessage className="mt-2">
                      Mật khẩu không khớp
                    </FormMessage>
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button
            className="bg-amber-500 hover:bg-amber-600 w-full max-w-20 mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Xác nhận"}
          </Button>
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            title="Cập nhật thành công"
            content="Mật khẩu của bạn đã được cập nhật thành công."
          />
        </form>
      </Form>
    </div>
  );
};

export default PasswordInput;
