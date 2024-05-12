import React from "react";
import Link from "next/link";

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, active, href }) => (
  <Link href={href} passHref>
    <div
      className={`flex items-center px-4 py-2 cursor-pointer ${
        active ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <span>{label}</span>
    </div>
  </Link>
);

const SideMenu: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-1/4 h-screen top-0 left-0">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
        <div className="font-bold">phanlvnminh</div>
      </div>
      <div className="mb-2">Sửa Hồ Sơ</div>
      <MenuItem
        label="Ưu Đãi Dành Riêng Cho Bạn"
        active
        icon={<span>🎁</span>}
        href="/deals"
      />
      <MenuItem
        label="Tài Khoản Của Tôi"
        icon={<span>👤</span>}
        href="/account"
      />
      <MenuItem label="Hồ Sơ" icon={<span>📄</span>} href="/profile" />
      <MenuItem label="Ngân Hàng" icon={<span>🏦</span>} href="/bank" />
      <MenuItem label="Địa Chỉ" icon={<span>🏠</span>} href="/address" />
      <MenuItem
        label="Đổi Mật Khẩu"
        icon={<span>🔑</span>}
        href="/change-password"
      />
      <MenuItem
        label="Cài Đặt Thông Báo"
        icon={<span>🔔</span>}
        href="/notification-settings"
      />
      <MenuItem
        label="Những Thiết Lập Riêng Tư"
        icon={<span>🔒</span>}
        href="/privacy-settings"
      />
      <MenuItem label="Đơn Mua" icon={<span>📦</span>} href="/orders" />
      <MenuItem
        label="Thông Báo"
        icon={<span>📢</span>}
        href="/notifications"
      />
      <MenuItem label="Kho Voucher" icon={<span>🎟️</span>} href="/vouchers" />
      <MenuItem label="Shopee Xu" icon={<span>$</span>} href="/shopee-xu" />
    </div>
  );
};

export default SideMenu;
