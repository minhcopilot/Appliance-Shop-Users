"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/app/AppProvider";

const sidebarItems = [
  { label: "📄 Hồ sơ", path: "/profile" },
  { label: "🔑 Đổi mật khẩu", path: "/profile/password" },
  { label: "📦 Đơn mua", path: "/profile/order" },
  { label: "🎟️ Kho voucher", path: "/profile/voucher" },
];

export default function Sidebar() {
  const { user } = useAppContext();

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-1/6 h-screen top-0 left-0">
      <div className="flex items-center mb-4">
        <Avatar>
          <AvatarImage src={user?.photo ?? ""} />
          <AvatarFallback>AVT</AvatarFallback>
        </Avatar>
        <div className="font-bold ms-2">
          {user?.firstName ?? ""} {user?.lastName ?? ""} <br />
          <span className="font-normal"> sửa hồ sơ</span>
        </div>
      </div>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
