"use client";
import { useOrder } from "@/hooks/useOrder";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function CheckoutRedirectButton({}: Props) {
  const Router = useRouter();
  const orderItems = useOrder((state) => state.orderItems);
  const redirect = () => {
    Router.push("/checkout?orderItems=" + JSON.stringify(orderItems));
  };
  return (
    <Button
      type="primary"
      danger
      size="large"
      onClick={redirect}
      disabled={orderItems.length === 0}
      className="w-full !bg-yellow-400 hover:!bg-yellow-500"
    >
      Mua hàng
    </Button>
  );
}
