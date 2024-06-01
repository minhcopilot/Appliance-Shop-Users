import OrderDetail from "@/components/checkout/OrderDetail";
import OrderForm from "@/components/checkout/OrderForm";
import { Flex } from "antd";
import React from "react";

type Props = {};

export default function CheckoutPage({}: Props) {
  return (
    <Flex vertical gap={10} className="container mt-5">
      <h1 className="text-2xl font-bold text-center uppercase">Thanh toán</h1>
      <OrderDetail />
      <OrderForm />
    </Flex>
  );
}
