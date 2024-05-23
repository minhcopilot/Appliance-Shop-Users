"use client";
import React, { useEffect, useState } from "react";
import { axiosClient } from "@/lib/axiosClient";
import OrderList from "@/components/orders/OrderList";
import { useAppContext } from "@/app/AppProvider";

const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAppContext();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const customerId = user?.id;
        const response = await axiosClient.get(
          `/orders/customer/${customerId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Danh sách đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className="container mt-8">
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
