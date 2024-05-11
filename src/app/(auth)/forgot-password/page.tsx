import { ForgotPassForm } from "@/app/(auth)/forgot-password/forgot-pass-form";
import React from "react";

export default function ForgotPassword() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Đặt lại mật khẩu</h1>
      <div className="flex justify-center">
        <ForgotPassForm />
      </div>
    </div>
  );
}
