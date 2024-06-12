"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axiosClient from "@/config/axiosClient";
import OrderList from "@/components/orders/OrderList";

const OrderCheckForm = () => {
  const [contactType, setContactType] = useState("phone");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setOrders([]);
    setIsLoading(true);

    if (value.trim() === "") {
      setError("Vui lòng nhập số điện thoại hoặc email");
      setIsLoading(false);
      return;
    }

    if (contactType === "phone") {
      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      if (!phoneRegex.test(value)) {
        setError("Số điện thoại không hợp lệ");
        setIsLoading(false);
        return;
      }
    } else if (contactType === "email") {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) {
        setError("Email không hợp lệ");
        setIsLoading(false);
        return;
      }
    }

    try {
      const params =
        contactType === "phone" ? { phoneNumber: value } : { email: value };
      const response = await axiosClient.get("/orders/customer-orders", {
        params,
      });
      setOrders(response.data);
      if (response.status === 204) {
        setOrders([]);
        setHasChecked(true);
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 404) {
        setError("Số điện thoại hoặc email không tồn tại trong hệ thống");
      } else {
        setError("Đã xảy ra lỗi khi lấy danh sách đơn hàng");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <Label
            htmlFor="contact-type"
            className="mb-2 font-semibold text-gray-700"
          >
            Kiểm tra bằng:
          </Label>
          <RadioGroup
            id="contact-type"
            value={contactType}
            onValueChange={setContactType}
            className="flex items-center space-x-6"
          >
            <div className="flex items-center">
              <RadioGroupItem
                value="phone"
                id="r2"
                className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-500"
              />
              <Label htmlFor="r2" className="ml-2 text-gray-700">
                Số điện thoại
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem
                value="email"
                id="r3"
                className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-500"
              />
              <Label htmlFor="r3" className="ml-2 text-gray-700">
                Email
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4">
          <Label htmlFor="input" className="mb-2 font-semibold text-gray-700">
            Nhập số điện thoại hoặc email:
          </Label>
          <Input
            id="input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              contactType === "phone" ? "Nhập số điện thoại" : "Nhập email"
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <Button
          type="submit"
          className="w-full px-4 py-2 text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          disabled={isLoading}
        >
          {isLoading ? "Đang tải..." : "Kiểm tra"}
        </Button>
      </form>
      {isLoading ? (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-center">
            Đang tải...
          </h3>
        </div>
      ) : hasChecked && orders.length === 0 ? (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-center">
            Không tìm thấy đơn hàng nào
          </h3>
        </div>
      ) : orders.length > 0 ? (
        <div className="container mt-8">
          <OrderList orders={orders} />
        </div>
      ) : (
        <div className="mt-8"></div>
      )}
    </div>
  );
};

export default OrderCheckForm;
