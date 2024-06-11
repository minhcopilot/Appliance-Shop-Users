"use client";
import { apiLoginSuccess } from "@/app/api/auth/authService";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";
import { axiosServerNext } from "@/lib/axiosClient";

interface Params {
  email: string;
}

export default function LoginSuccess() {
  //@ts-ignore
  const { email } = useParams<Params>();
  const decodedEmail = decodeURIComponent(email);
  const router = useRouter();
  const { setSessionToken, setUser } = useAppContext();
  useEffect(() => {
    const fetchToken = async () => {
      let result: any = await apiLoginSuccess(decodedEmail);
      if (result.data) {
        const user = result.data.payload.data.customer;
        const token = result.data.payload.data.token;

        setUser(user);
        setSessionToken(token);

        // Gửi thông tin user và token tới API
        await axiosServerNext.post("/api/auth", { token, user });
      } else {
        alert("Login failed");
      }
    };
    fetchToken();
  }, [decodedEmail]);
  const handleGoToHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-auto py-28 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src="/icons8-success.gif"
            alt="Success Icon"
            className="w-16 h-16"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Đăng nhập thành công!
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Chào mừng bạn đến với trang đồ gia dụng Haven số 1 Đà Nẵng
        </p>
        <button
          onClick={handleGoToHome}
          className="w-full py-3 px-4 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300"
        >
          Khám phá ngay!
        </button>
      </div>
    </div>
  );
}
