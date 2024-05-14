import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { label: "📄 Hồ sơ", path: "/profile" },
  { label: "🔑 Đổi mật khẩu", path: "/profile/password" },
  { label: "📦 Đơn mua", path: "/profile/order" },
  { label: "🎟️ Kho voucher", path: "/profile/voucher" },
];

export default function Sidebar() {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-1/4 h-screen top-0 left-0">
      <div className="flex items-center mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="font-bold ms-2">
          phanlvnminh <br />
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
