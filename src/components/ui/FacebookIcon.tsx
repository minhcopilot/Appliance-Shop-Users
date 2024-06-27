"use client";
import { Facebook } from "@/components/icons";
import Link from "next/link";
import React from "react";

const FacebookIcon: React.FC<any> = () => {
  return (
    <div className="fixed bottom-32 right-6">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-2">
        <Link href="https://www.facebook.com/phanvubao1990">
          <Facebook />
        </Link>
      </button>
    </div>
  );
};

export default FacebookIcon;
