"use client";
import { useAppContext } from "@/app/AppProvider";
import { VoucherSkeleton } from "@/components/ui/VoucherSkeleton";
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
  voucherType: string;
}

const VoucherList: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppContext().user;
  const token = useAppContext().sessionToken;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        let allVouchers: Voucher[] = [];

        const userVouchersResponse = await axiosClient.get(
          `/vouchers/get-vouchers-for-customer/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userVouchersResponse.data.length > 0) {
          const userVoucherIds = userVouchersResponse.data.map(
            (voucher: any) => voucher.voucherId
          );

          const userVoucherPromises = userVoucherIds.map((id: number) =>
            axiosClient.get(`/vouchers/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );

          const userVoucherDetails = await Promise.all(userVoucherPromises);
          const detailedUserVouchers = userVoucherDetails.map(
            (res) => res.data
          );

          allVouchers = [...detailedUserVouchers];
        }

        // Fetch global vouchers
        const globalVouchersResponse = await axiosClient.get(`/vouchers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const detailedGlobalVouchers = globalVouchersResponse.data;
        const filteredGlobalVouchers = detailedGlobalVouchers.filter(
          (voucher: Voucher) => voucher.voucherType === "GLOBAL"
        );

        // Combine user-specific and global vouchers
        allVouchers = [...allVouchers, ...filteredGlobalVouchers];

        setVouchers(allVouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [user, token]);

  const formatDayVoucher = vouchers.map((voucher: any) => ({
    ...voucher,
    expiryDate: new Date(voucher.expiryDate),
    startDate: new Date(voucher.startDate),
  }));

  // Filter valid vouchers
  const currentDate = new Date();
  const validVouchers = formatDayVoucher.filter(
    (voucher) =>
      voucher.expiryDate >= currentDate &&
      voucher.startDate <= currentDate &&
      voucher.remainingUsageCount > 0
  );

  return (
    <div className="">
      <h1 className="mb-6 text-2xl font-bold text-center">Kho Voucher</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <VoucherSkeleton />
        ) : validVouchers.length === 0 ? (
          <p>Không có voucher nào.</p>
        ) : (
          validVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="sm:w-full md:text-md bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="sm:text-sm md:text-md lg:text-lg font-bold text-yellow-600">
                    {voucher.voucherCode}
                  </span>
                  <span className="sm:text-sm md:text-md lg:text-md bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded">
                    Giảm giá {voucher.discountPercentage}%
                  </span>
                </div>
                <div className="text-gray-600 text-sm mb-4">
                  <p>
                    Đã dùng:{" "}
                    {Math.round(
                      (voucher.remainingUsageCount * 100) /
                        voucher.maxUsageCount
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
                <div className="flex justify-center">
                  <Link href="/cart">
                    <button className="px-4 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-300">
                      Dùng ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VoucherList;
