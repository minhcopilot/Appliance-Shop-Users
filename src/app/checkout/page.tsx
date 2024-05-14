import OrderDetail from "@/components/checkout/OrderDetail";
import OrderForm from "@/components/checkout/OrderForm";
import { Flex } from "antd";
import React from "react";

type Props = {};

export default function CheckoutPage({}: Props) {
  return (
    <Flex vertical gap={10}>
      <OrderDetail />
      <OrderForm />
    </Flex>
  );
}
