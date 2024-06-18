"use client";
import Cart from "@/components/cart/Cart";
import CheckoutRedirectButton from "@/components/cart/CheckoutRedirectButton";
import TotalPrice from "@/components/cart/TotalPrice";
import { useOrder } from "@/hooks/useOrder";
import { Flex, Layout } from "antd";
import React from "react";

type Props = {};

export default function CartPage({}: Props) {
  const { orderItems } = useOrder((state) => state);
  return (
    <>
      <h1 className="text-2xl font-bold text-center uppercase">
        Giỏ hàng của bạn
      </h1>
      <div className="bg-inherit grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        <div className="lg:py-3 lg:px-14 sm:p-2 p-2">
          <Cart />
        </div>
        <div className="lg:py-3 lg:px-14 bg-inherit flex-shrink-0 lg:mt-16">
          <div className="flex flex-col justify-center items-center gap-3">
            <TotalPrice items={orderItems} />
            <CheckoutRedirectButton />
          </div>
        </div>
      </div>
    </>
  );
}
