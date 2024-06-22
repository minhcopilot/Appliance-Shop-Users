import { RegisterForm } from "@/app/(auth)/register/register-form";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản Gia dụng Haven",
  description: "Đăng ký tài khoản Gia dụng Haven",
};
export default function Login() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Đăng ký tài khoản</h1>
      <div className="flex justify-center ">
        <RegisterForm />
      </div>
    </div>
  );
}
