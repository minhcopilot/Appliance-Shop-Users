"use client";
import React, { useState } from "react";

interface Voucher {
  id: number;
  code: string;
  discount: number;
  expirationDate: Date;
  isActive: boolean;
}

const VoucherList: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: 1,
      code: "SUMMER2023",
      discount: 20,
      expirationDate: new Date("2023-08-31"),
      isActive: true,
    },
    {
      id: 2,
      code: "NEWYEAR2023",
      discount: 15,
      expirationDate: new Date("2023-01-31"),
      isActive: false,
    },
    // Thêm các voucher khác tại đây
  ]);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Kho Voucher</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${
              voucher.isActive ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div>
              <h2 className="text-xl font-bold">{voucher.code}</h2>
              <p className="text-gray-600">Giảm giá {voucher.discount}%</p>
              <p className="text-gray-600">
                Hết hạn: {voucher.expirationDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <button
                className={`px-4 py-2 rounded-md ${
                  voucher.isActive
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!voucher.isActive}
              >
                {voucher.isActive ? "Sử dụng" : "Hết hạn"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
