"use client";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/hooks/useOrder";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosClient } from "@/lib/axiosClient";

type Props = {
  items: OrderItem[];
  onVoucherSelect: (voucherCode: string | null) => void;
};

interface Voucher {
  id: number;
  voucherCode: string;
  discountPercentage: number;
  maxUsageCount: number;
  remainingUsageCount: number;
  expiryDate: Date;
  startDate: Date;
}

export default function TotalPriceVoucher({ items, onVoucherSelect }: Props) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axiosClient.get("/vouchers");
        const fetchedVouchers = response.data.map((voucher: any) => ({
          ...voucher,
          expiryDate: new Date(voucher.expiryDate),
          startDate: new Date(voucher.startDate),
        }));
        setVouchers(fetchedVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  // Lọc các voucher hợp lệ
  const currentDate = new Date();
  const validVouchers = vouchers.filter(
    (voucher) =>
      voucher.expiryDate >= currentDate &&
      voucher.startDate <= currentDate &&
      voucher.remainingUsageCount > 0
  );

  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    onVoucherSelect(voucher.voucherCode);
    setIsDialogOpen(false);
  };

  const totalDiscount = items.reduce(
    (acc, item) =>
      acc + ((item.price * (item.discount ?? 0)) / 100) * item.quantity,
    0
  );

  const subtotalPrice = items.reduce(
    (acc, item) =>
      acc + ((item.price * (100 - (item.discount ?? 0))) / 100) * item.quantity,
    0
  );

  const additionalDiscount = selectedVoucher
    ? subtotalPrice * ((selectedVoucher.discountPercentage ?? 0) / 100)
    : 0;

  const totalPrice = subtotalPrice;
  const finalPrice = totalPrice - additionalDiscount;

  return (
    <div className="flex flex-col gap-3 text-base">
      <div>
        <span>Haven Voucher</span>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="ms-4 text-yellow-600 hover:!bg-white hover:!text-yellow-700"
              onClick={() => setIsDialogOpen(true)}
            >
              {selectedVoucher ? selectedVoucher.voucherCode : "Chọn Voucher"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chọn Voucher</DialogTitle>
              <DialogDescription>
                Chọn một trong các voucher bên dưới:
              </DialogDescription>
            </DialogHeader>
            <ul>
              {validVouchers.map((voucher) => (
                <li key={voucher.id} className="my-2">
                  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-yellow-600">
                            {voucher.voucherCode}
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded">
                            Giảm giá {Math.round(voucher.discountPercentage)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <span>
                            Đã dùng:{" "}
                            {Math.round(
                              (voucher.remainingUsageCount * 100) /
                                voucher.maxUsageCount
                            )}
                            %
                          </span>
                          <span className="mx-2">|</span>
                          <span>
                            HSD:{" "}
                            {voucher.expiryDate.toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="text-yellow-600 hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                        onClick={() => handleSelectVoucher(voucher)}
                      >
                        Chọn
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="mt-4 text-yellow-600 hover:!bg-white hover:!text-yellow-700"
                onClick={() => setIsDialogOpen(false)}
              >
                Đóng
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <Flex gap={10}>
        <div className="text-base">Tiết kiệm</div>
        <div className="text-xl text-yellow-600">
          {(totalDiscount + additionalDiscount).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </Flex>
      <Flex gap={10}>
        <div className="text-xl font-bold">Tổng cộng thanh toán</div>
        <div className="text-2xl font-bold text-yellow-600">
          {finalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </Flex>
    </div>
  );
}
