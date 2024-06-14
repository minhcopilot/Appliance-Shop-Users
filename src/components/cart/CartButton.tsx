"use client";
import { useCart } from "@/hooks/useCart";
import { Badge, Popover } from "antd";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cart from "./Cart";
import Link from "next/link";

type Props = {};

export default function CartButton({}: Props) {
  const { items } = useCart((state) => state);
  return (
    <Popover
      placement="bottomRight"
      title="Sản phẩm mới thêm"
      content={<Cart compact />}
      className="block mb-[-10px] z-50"
    >
      <Link href="/cart">
        <Badge
          count={items.length}
          overflowCount={99}
          className="border-accent"
        >
          <HiOutlineShoppingBag className="text-[30px] text-accent-foreground" />
        </Badge>
      </Link>
    </Popover>
  );
}
