"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { axiosClient } from "@/lib/axiosClient";
import { Input } from "@/components/ui/input";

interface OrderDetail {
  productId: number;
  quantity: number;
  price: string;
  discount: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    stock: number;
    description: string;
    imageUrls: string;
    coverImageUrl: string | null;
    categoryId: number;
    supplierId: number;
  };
}

interface Order {
  id: number;
  createdDate: string;
  shippedDate: string | null;
  status: string;
  shippingAddress: string;
  shippingCity: string;
  paymentType: string;
  orderDetails: OrderDetail[];
  voucherId?: number;
  voucherCode?: string;
  discountPercentage?: number;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [showSheet, setShowSheet] = useState<number | null>(null);
  const [orderData, setOrderData] = useState<Order[]>(orders);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sheetRef: any = useRef(null);

  const handleShowSheet = (orderId: number) => {
    setShowSheet(orderId);
  };

  const handleCloseSheet = () => {
    setShowSheet(null);
  };

  useEffect(() => {
    const fetchVoucherCodes = async () => {
      try {
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            if (order.voucherId) {
              const response = await axiosClient.get(
                `/vouchers/${order.voucherId}`
              );
              return {
                ...order,
                voucherCode: response.data.voucherCode,
                discountPercentage: response.data.discountPercentage,
              };
            }
            return order;
          })
        );
        setOrderData(updatedOrders);
      } catch (error) {
        console.error("Error fetching voucher codes:", error);
      }
    };

    fetchVoucherCodes();
  }, [orders]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target)) {
        handleCloseSheet();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sheetRef]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setOrderData(orders);
        return;
      }

      try {
        const response = await axiosClient.get(`/orders/search`, {
          params: { keyword: searchQuery },
        });
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, orders]);

  const calculateTotalOrderValue = (order: Order) => {
    const orderTotal = order.orderDetails.reduce((total, detail) => {
      const productPrice = parseFloat(detail.price);
      const productDiscount = detail.discount;
      const discountedPrice =
        productPrice - (productPrice * productDiscount) / 100;
      const productTotal = discountedPrice * detail.quantity;
      return total + productTotal;
    }, 0);

    const discount = order.discountPercentage || 0;
    return orderTotal - (orderTotal * discount) / 100;
  };

  const totalPrice = (orderDetail: OrderDetail) => {
    const productPrice = parseFloat(orderDetail.price);
    const productDiscount = orderDetail.discount;
    const discountedPrice =
      productPrice - (productPrice * productDiscount) / 100;
    const productTotal = discountedPrice * orderDetail.quantity;
    return productTotal;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Nhập id đơn hàng hoặc tên sản phẩm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableCaption>Danh sách các đơn hàng của bạn.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Địa chỉ giao hàng</TableHead>
              <TableHead>Phương thức thanh toán</TableHead>
              <TableHead>Mã giảm giá</TableHead>
              <TableHead>Tổng thanh toán</TableHead>
              <TableHead>Chi tiết đơn hàng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{`${order.shippingAddress}, ${order.shippingCity}`}</TableCell>
                  <TableCell>{order.paymentType}</TableCell>
                  <TableCell>{order.voucherCode || " "}</TableCell>
                  <TableCell>
                    {calculateTotalOrderValue(order).toFixed(0)} đ
                  </TableCell>
                  <TableCell>
                    <Sheet open={showSheet === order.id}>
                      <SheetTrigger asChild>
                        <Button onClick={() => handleShowSheet(order.id)}>
                          Chi tiết đơn hàng
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        ref={sheetRef}
                        style={{ maxWidth: "750px" }}
                      >
                        <SheetHeader>
                          <SheetTitle className="mb-5">
                            Chi tiết đơn hàng # {order.id}
                          </SheetTitle>
                          <SheetClose asChild onClick={handleCloseSheet}>
                            <button className="absolute top-0 inline-flex items-center justify-center p-1 rounded-full right-2 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </SheetClose>
                        </SheetHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tên sản phẩm</TableHead>
                              <TableHead>Số lượng</TableHead>
                              <TableHead>Đơn giá</TableHead>
                              <TableHead>Giảm giá</TableHead>
                              <TableHead>Hình ảnh</TableHead>
                              <TableHead>Tổng tiền</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderDetails.map((detail) => (
                              <TableRow key={detail.productId}>
                                <TableCell>{detail.product.name}</TableCell>
                                <TableCell>{detail.quantity}</TableCell>
                                <TableCell>{detail.price}</TableCell>
                                <TableCell>{detail.discount}%</TableCell>
                                <TableCell>
                                  <Image
                                    src={
                                      JSON.parse(detail.product.imageUrls)[0]
                                        .url
                                    }
                                    alt={detail.product.name}
                                    width={100}
                                    height={100}
                                  />
                                </TableCell>
                                <TableCell>
                                  {totalPrice(detail).toFixed(0)} đ
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderList;
