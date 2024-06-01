"use client";
import React, { useEffect, useState } from "react";
import { axiosClient } from "@/lib/axiosClient";
import OrderList from "@/components/orders/OrderList";
import OrderListSkeleton from "@/components/ui/OrderListSkeleton";
import { useAppContext } from "@/app/AppProvider";

const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      {loading ? (
        <OrderListSkeleton /> // Render the skeleton component while loading
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className="">
          <OrderList orders={orders} />
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
