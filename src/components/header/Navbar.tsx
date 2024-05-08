import Link from "next/link";
import React from "react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <div className={`hidden lg:block ${className}`}>
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="navbar__link relative" href="/">
            TRANG CHỦ
          </Link>
          <Link className="navbar__link relative" href="/products">
            SẢN PHẨM
          </Link>
          <Link className="navbar__link relative" href="/blog">
            BLOG
          </Link>
          <Link className="navbar__link relative" href="/news">
            TIN TỨC
          </Link>
          <Link className="navbar__link relative" href="/contact">
            LIÊN HỆ
          </Link>
          <Link className="navbar__link relative" href="/check-order">
            KIỂM TRA ĐƠN HÀNG
          </Link>
        </div>
      </div>
    </div>
  );
}
