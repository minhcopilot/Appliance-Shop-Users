"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import Image from "next/image";
import { axiosClient } from "@/lib/axiosClient";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/app/AppProvider";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SuccessModal from "@/components/ui/SuccessModal";
import { ChevronLeft } from "lucide-react";

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
  const user = useAppContext().user;
  const token = useAppContext().sessionToken;
  const [showSheet, setShowSheet] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState<Order[]>(
    orders.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sheetRef: any = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const handlePageChange = (action: any) => {
    if (action === "next") {
      if (currentPage === totalPages) return;
      setCurrentPage(currentPage + 1);
    } else if (action === "prev") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
    }
  };
  const handleShowSheet = (orderId: number) => {
    setShowSheet(orderId);
  };

  const handleCloseSheet = () => {
    setShowSheet(null);
  };

  const fetchVoucherCodes = useCallback(async () => {
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
      setOrderData(
        updatedOrders.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching voucher codes:", error);
    }
  }, [orders]);

  const fetchSearchResults = useCallback(async () => {
    if (searchQuery.trim() === "") {
      setOrderData(
        orders.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
      );
      return;
    }

    try {
      const response = await axiosClient.get(`/orders/search`, {
        params: { keyword: searchQuery },
      });
      setOrderData(
        response.data.sort(
          (a: any, b: any) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchQuery, orders]);

  useEffect(() => {
    fetchVoucherCodes();
  }, [fetchVoucherCodes]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target) &&
        !isAlertOpen
      ) {
        handleCloseSheet();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sheetRef, isAlertOpen]);

  const calculateTotalOrderValue = (order: Order) => {
    const orderTotal = order.orderDetails.reduce((total, detail) => {
      const productPrice = parseFloat(detail.product.price.toString());
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
    const productPrice = parseFloat(orderDetail.product.price.toString());
    const productDiscount = orderDetail.discount;
    const discountedPrice =
      productPrice - (productPrice * productDiscount) / 100;
    const productTotal = discountedPrice * orderDetail.quantity;
    return productTotal;
  };
  const getStatusColor = (status: any) => {
    switch (status) {
      case "WAITING":
        return "text-yellow-500 font-bold";
      case "COMPLETED":
        return "text-green-500 font-bold";
      case "CANCELLED":
        return "text-red-500 font-bold";
      case "DELIVERING":
        return "text-blue-500 font-bold";
      default:
        return "text-gray-500 font-bold";
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "WAITING":
        return "Đang chờ";
      case "COMPLETED":
        return "Đã hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      case "DELIVERING":
        return "Đang giao";
      default:
        return status;
    }
  };
  const getPaymentTypeText = (paymentType: string) => {
    switch (paymentType) {
      case "CASH":
        return "Tiền mặt";
      case "MOMO":
        return "Ví MoMo";
      default:
        return paymentType;
    }
  };
  const handleCancelOrder = async (orderId: any) => {
    setIsLoading(true);
    try {
      const result = await axiosClient.patch(
        `/orders/${orderId}/cancel`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result) {
        setShowSuccessModal(true);
        const updatedOrders = orderData.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELLED" } : order
        );
        setOrderData(updatedOrders);
      }
    } catch (error) {
      toast({
        title: "Lỗi huỷ đơn hàng",
        description: "Đã có lỗi xảy ra khi huỷ đơn hàng!",
      });
    } finally {
      setIsLoading(false);
      setShowSuccessModal(true);
    }
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
          className="mb-4 w-2/3"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Địa chỉ </TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead>Mã giảm giá</TableHead>
              <TableHead>Tổng thanh toán</TableHead>
              <TableHead>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdDate).toLocaleString()}
                  </TableCell>
                  <TableCell className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </TableCell>
                  <TableCell>{`${order.shippingAddress}, ${order.shippingCity}`}</TableCell>
                  <TableCell>{getPaymentTypeText(order.paymentType)}</TableCell>
                  <TableCell>{order.voucherCode || " "}</TableCell>
                  <TableCell>
                    {calculateTotalOrderValue(order).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      useGrouping: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Sheet open={showSheet === order.id}>
                      <SheetTrigger asChild>
                        <Button onClick={() => handleShowSheet(order.id)}>
                          Chi tiết
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
                        <ScrollArea style={{ height: "550px" }}>
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
                                  <TableCell className="w-[180px] ">
                                    <Link
                                      href={"/products/" + detail.productId}
                                    >
                                      {detail.product.name
                                        ? detail.product.name.substring(0, 40) +
                                          (detail.product.name.length > 40
                                            ? "..."
                                            : "")
                                        : detail.product.name}
                                    </Link>
                                  </TableCell>

                                  <TableCell className="text-center">
                                    {detail.quantity}
                                  </TableCell>
                                  <TableCell>
                                    {detail.product.price.toLocaleString(
                                      "vi-VN",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                        useGrouping: true,
                                      }
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {detail.discount}%
                                  </TableCell>

                                  <TableCell>
                                    <Link
                                      href={"/products/" + detail.productId}
                                    >
                                      <Image
                                        src={
                                          JSON.parse(
                                            detail.product.imageUrls
                                          )[0].url
                                        }
                                        alt={detail.product.name}
                                        width={100}
                                        height={100}
                                      />
                                    </Link>
                                  </TableCell>

                                  <TableCell>
                                    {totalPrice(detail).toLocaleString(
                                      "vi-VN",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                        useGrouping: true,
                                      }
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        <div className="flex justify-center">
                          {user ? (
                            order.status === "WAITING" ? (
                              <AlertDialog
                                open={isAlertOpen}
                                onOpenChange={setIsAlertOpen}
                              >
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    onClick={handleOpenAlert}
                                  >
                                    {isLoading ? (
                                      <LoadingSpinner />
                                    ) : (
                                      "Hủy đơn hàng"
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Hủy đơn hàng?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Bạn có chắc chắn hủy đơn hàng này không?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => setIsAlertOpen(false)}
                                    >
                                      Quay lại
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        handleCancelOrder(order.id);
                                        setIsAlertOpen(false);
                                      }}
                                      className="text-white bg-red-500 hover:text-white hover:bg-red-600"
                                    >
                                      {isLoading ? <LoadingSpinner /> : "Hủy"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <Link href={"/products"}>
                                <Button className="mt-10">Mua lại</Button>
                              </Link>
                            )
                          ) : null}
                        </div>
                        <SuccessModal
                          isOpen={showSuccessModal}
                          onClose={() => setShowSuccessModal(false)}
                          title="Huỷ đơn hàng thành công!"
                          content="Đơn hàng của bạn đã được huỷ thành công."
                        />
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange("prev")} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange("next")} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default OrderList;
