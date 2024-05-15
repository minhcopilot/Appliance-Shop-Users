"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BirthDateInputs from "@/components/ui/BirthDateInputs";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { axiosClient } from "@/lib/axiosClient";
import SuccessModal from "@/components/ui/SuccessModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileForm() {
  const { user, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>(user?.photo || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    birthday: user?.birthday,
  });
  const [selectedBirthday, setSelectedBirthday] = useState(
    user?.birthday || "1990-01-01"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          },
        }
      );

      if (result.status === 200) {
        setIsLoading(false);
        setShowSuccessModal(true);
        localStorage.setItem("user", JSON.stringify(result.data));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="mb-6">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Hồ Sơ Của Tôi
          </h3>
          <p className="text-sm text-muted-foreground">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end" htmlFor="firstName">
                Họ
              </Label>
              <Input
                id="firstName"
                defaultValue={user?.firstName}
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end" htmlFor="lastName">
                Tên
              </Label>
              <Input
                id="lastName"
                defaultValue={user?.lastName}
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end" htmlFor="phoneNumber">
                Số điện thoại
              </Label>
              <Input
                id="phoneNumber"
                defaultValue={user?.phoneNumber}
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end" htmlFor="address">
                Địa chỉ
              </Label>
              <Input
                id="address"
                defaultValue={user?.address}
                className="col-span-2"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-end">Ngày sinh</Label>
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
              className="bg-yellow-500 hover:bg-yellow-600 hover:text-white text-white "
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Lưu"}
            </Button>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Cập nhật thành công"
        content="Thông tin của bạn đã được cập nhật thành công."
      />
    </form>
  );
}
