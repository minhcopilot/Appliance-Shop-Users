"use client";
import { useCart } from "@/hooks/useCart";
import useStore from "@/hooks/useStore";
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
      title="Giỏ hàng"
      content={<Cart limit={5} compact />}
    >
      <Link href="/cart">
        <Badge count={items.length} overflowCount={99}>
          <HiOutlineShoppingBag className="text-2xl text-gray-700" />
        </Badge>
      </Link>
    </Popover>
  );
}
