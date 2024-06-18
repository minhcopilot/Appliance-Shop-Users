import OrderDetail from "@/components/checkout/OrderDetail";
import OrderForm from "@/components/checkout/OrderForm";
import React from "react";

type Props = {};

export default function CheckoutPage({}: Props) {
  return (
    <div className="container mt-5 ">
      <h1 className="text-2xl font-bold text-center uppercase">Thanh toán</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 md">
        <OrderDetail />
        <OrderForm />
      </div>
    </div>
  );
}
