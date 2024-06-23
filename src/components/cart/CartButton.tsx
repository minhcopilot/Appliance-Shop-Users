"use client";
import { useCart } from "@/hooks/useCart";
import { Badge, Popover } from "antd";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cart from "./Cart";
import Link from "next/link";

type Props = {
  isMobile?: boolean;
};

export default function CartButton({ isMobile }: Props) {
  const { items } = useCart((state) => state);
  if (isMobile)
    return (
      <Link href="/cart" className="mt-1">
        <Badge
          count={items.length}
          overflowCount={99}
          className="border-accent text-[10px]"
        >
          <HiOutlineShoppingBag className="text-[25px] text-accent-foreground" />
        </Badge>
      </Link>
    );
  return (
    <Popover
      placement="bottomRight"
      title="Sản phẩm mới thêm"
      content={<Cart compact />}
      className="block mb-[-10px] z-50"
      trigger="hover"
    >
      <Link href="/cart">
        <Badge
          count={items.length}
          overflowCount={99}
          className="border-accent text-[10px]"
        >
          <HiOutlineShoppingBag className="text-[25px] text-accent-foreground" />
        </Badge>
      </Link>
    </Popover>
  );
}
