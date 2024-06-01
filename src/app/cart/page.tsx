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
    <Flex style={{ backgroundColor: "inherit" }} wrap>
      <Content className="py-3 px-14">
        <h1 className="text-2xl font-bold text-center uppercase">
          Giỏ hàng của bạn
        </h1>
        <Cart />
      </Content>
      <Sider
        width={500}
        className="py-3 px-14"
        style={{ backgroundColor: "inherit" }}
      >
        <div className="flex flex-col gap-3">
          <TotalPrice items={orderItems} />
          <CheckoutRedirectButton />
        </div>
      </Sider>
    </Flex>
  );
}
