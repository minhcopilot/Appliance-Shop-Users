"use client";
import { useAppContext } from "@/app/AppProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { axiosServerNext } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonLogout() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAppContext();

  const handleLogout = async () => {
    try {
      await axiosServerNext.post("/api/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
      router.push("/");
    } catch (error: any) {
      //handle error logout
      toast({
        title: "Lỗi",
        description: "Có lỗi khi đăng xuất",
      });
    }
  };
  return (
    <Button
      className="block w-full bg-gray-200 text-gray-700 rounded-md h-9 px-2 text-sm text-center hover:bg-gray-300"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  );
}
