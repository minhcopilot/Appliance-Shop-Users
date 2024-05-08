"use client";
import { apiLoginSuccess } from "@/app/api/auth/authService";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface Params {
  email: string;
}

export default function LoginSuccess() {
  //@ts-ignore
  const { email } = useParams<Params>();
  const decodedEmail = decodeURIComponent(email);

  useEffect(() => {
    const fetchToken = async () => {
      let response: any = await apiLoginSuccess(decodedEmail);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    };
    fetchToken();
  }, [decodedEmail]);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Đăng nhập thành công</h1>
      <img
        src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1639431286825810&height=50&width=50&ext=1714883324&hash=AfrxLhoi7Y9FsUmnODTScceftgHnVsSloJlhLp5WxPR13A"
        alt="Ảnh từ Facebook"
      ></img>
    </div>
  );
}
