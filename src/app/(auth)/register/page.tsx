import { RegisterForm } from "@/app/(auth)/register/register-form";
import React from "react";

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
