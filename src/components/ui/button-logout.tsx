"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { axiosServerNext } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonLogout() {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      await axiosServerNext.post("/api/auth/logout");
      router.push("/login");
    } catch (error: any) {
      //handle error logout
      toast({
        title: "Lỗi",
        description: "Có lỗi khi đăng xuất",
      });
    }
  };
  return <Button onClick={handleLogout}>Đăng xuất</Button>;
}
