"use client";
import { axiosClient } from "@/lib/axiosClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Voucher {
  id: number;
  voucherCode: string;
  discountPercentage: number;
  maxUsageCount: number;
  remainingUsageCount: number;
  expiryDate: Date;
  startDate: Date;
}

const VoucherList: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

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

  // Lọc các voucher còn hạn sử dụng
  const currentDate = new Date();
  const validVouchers = vouchers.filter(
    (voucher) =>
      voucher.expiryDate >= currentDate &&
      voucher.startDate <= currentDate &&
      voucher.remainingUsageCount > 0
  );

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Kho Voucher</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {validVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-yellow-600">
                  {voucher.voucherCode}
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded">
                  Giảm giá {voucher.discountPercentage}%
                </span>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                <p>
                  Đã dùng:{" "}
                  {Math.round(
                    (voucher.remainingUsageCount * 100) / voucher.maxUsageCount
                  )}
                  %
                </p>
                <p>
                  Ngày hiệu lực:{" "}
                  {voucher.startDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p>
                  Hết hạn:{" "}
                  {voucher.expiryDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex justify-center ">
                <Link href="/cart">
                  <button className="p-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300">
                    Dùng ngay
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
