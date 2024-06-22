import { LoginForm } from "@/app/(auth)/login/login-form";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập gia dụng Haven",
  description: "Đăng nhập gia dụng Haven",
};
export default function Login() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Đăng nhập</h1>
      <div className="flex justify-center ">
        <LoginForm />
      </div>
    </div>
  );
}
