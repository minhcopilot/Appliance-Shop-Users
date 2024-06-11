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

      router.push("/");
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: "Có lỗi khi đăng xuất",
      });
    }
  };
  return (
    <Button
      className="block w-full px-2 text-sm text-center text-gray-700 bg-gray-200 rounded-md h-9 hover:bg-gray-300"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  );
}
