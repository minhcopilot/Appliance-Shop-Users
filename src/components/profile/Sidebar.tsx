"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/app/AppProvider";
import { User, Key, ShoppingBag, Ticket } from "lucide-react";

export default function Sidebar() {
  const { user } = useAppContext();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1);
    }
  }, []);

  const menuItems = [
    { href: "/profile", icon: User, label: "Hồ sơ" },
    { href: "/profile/password", icon: Key, label: "Đổi mật khẩu" },
    { href: "/profile/order", icon: ShoppingBag, label: "Đơn mua" },
    { href: "/profile/voucher", icon: Ticket, label: "Kho voucher" },
  ];

  return (
    <div className="w-full h-full bg-gray-50 shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.photo ?? ""} alt={user?.firstName} />
          <AvatarFallback className="text-lg">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 ">
          <h2 className="font-bold text-xl text-gray-800">
            {user?.firstName ?? ""} {user?.lastName ?? ""}
          </h2>
          <Link
            href="/profile"
            className="text-blue-600 hover:underline text-sm"
          >
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
