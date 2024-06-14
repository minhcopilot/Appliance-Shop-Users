"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BirthDateInputs from "@/components/ui/BirthDateInputs";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { axiosClient } from "@/lib/axiosClient";
import SuccessModal from "@/components/ui/SuccessModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  firstName: z.string().min(1, "Họ không được để trống"),
  lastName: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không đúng định dạng"),
  phoneNumber: z
    .string()
    .regex(
      /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
      "Số điện thoại không đúng định dạng"
    ),
  address: z.string().optional(),
  birthday: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProfileForm() {
  const { user, setUser } = useAppContext();
  const token = useAppContext().sessionToken;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>(user?.photo || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(
    user?.birthday || "1990-01-01"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      birthday: user?.birthday || "",
    },
  });

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarDataUrl("");
    }
  };

  const handleBirthdayChange = (day: number, month: number, year: number) => {
    const birthday = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedBirthday(birthday);
  };

  const handleSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);
    try {
      const formData1: any = new FormData();
      formData1.append("firstName", formData.firstName || "");
      formData1.append("lastName", formData.lastName || "");
      formData1.append("phoneNumber", formData.phoneNumber || "");
      formData1.append("address", formData.address || "");
      formData1.append("birthday", selectedBirthday);
      formData1.append("email", formData.email || "");
      if (selectedFile) {
        formData1.append("photo", selectedFile);
      }

      const result = await axiosClient.patch(
        `/customers/${user?.id}`,
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        setIsLoading(false);
        setShowSuccessModal(true);
        setUser(result.data);
      } else {
        setIsLoading(false);
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra, Vui lòng thử lại sau!",
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
              Hồ Sơ Của Tôi
            </h3>
            <p className="text-sm text-muted-foreground">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid items-center ">
                <FormLabel className="mb-4">Ngày sinh</FormLabel>
                <div className="col-span-2">
                  <div className="col-span-2">
                    <BirthDateInputs
                      birthday={user?.birthday}
                      onDateChange={handleBirthdayChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar>
                  <AvatarImage src={avatarDataUrl} />
                  <AvatarFallback>AVT</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-4">
                  <ImageUploader
                    maxFileSize={2 * 1024 * 1024}
                    acceptedFileTypes="image/jpeg"
                    onFileSelected={handleFileSelected}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Dung lượng file tối đa 1 MB
                </p>
                <p className="text-sm text-muted-foreground">
                  Định dạng: .JPEG, .PNG
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="outline"
                className="text-white bg-yellow-500 hover:bg-yellow-600 hover:text-white "
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Cập nhật thành công"
        content="Thông tin của bạn đã được cập nhật thành công."
      />
    </Form>
  );
}
