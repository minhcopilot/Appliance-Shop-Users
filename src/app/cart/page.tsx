"use client";
import Cart from "@/components/cart/Cart";
import CheckoutRedirectButton from "@/components/cart/CheckoutRedirectButton";
import TotalPrice from "@/components/cart/TotalPrice";
import { useOrder } from "@/hooks/useOrder";
import { Flex, Layout } from "antd";
const { Content, Sider } = Layout;
import React from "react";

type Props = {};

export default function CartPage({}: Props) {
  const { orderItems } = useOrder((state) => state);
  return (
    <>
      <h1 className="text-2xl font-bold text-center uppercase">
        Giỏ hàng của bạn
      </h1>
      <div className="bg-inherit flex">
        <Content className="py-3 px-14 flex-grow">
          <Cart />
        </Content>
        <Sider width={400} className="py-3 px-14 bg-inherit flex-shrink-0">
          <div className="flex flex-col gap-3">
            <TotalPrice items={orderItems} />
            <CheckoutRedirectButton />
          </div>
        </Sider>
      </div>
    </>
  );
}
