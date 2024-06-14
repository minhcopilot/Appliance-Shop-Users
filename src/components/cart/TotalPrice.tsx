import { OrderItem } from "@/hooks/useOrder";
import { Flex } from "antd";
import React from "react";

type Props = { items: OrderItem[] };

export default function TotalPrice({ items }: Props) {
  return (
    <Flex vertical gap={10}>
      <Flex gap={10}>
        <div className="text-lg font-bold">Tổng cộng</div>
        <div className="text-2xl font-bold text-yellow-600">
          {items
            .reduce(
              (acc, item) =>
                acc +
                ((item.price * (100 - (item.discount ?? 0))) / 100) *
                  item.quantity,
              0
            )
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </div>
      </Flex>
      <Flex gap={10}>
        <div className="text-base">Tiết kiệm</div>
        <div className="text-xl text-yellow-600">
          {items
            .reduce(
              (acc, item) =>
                acc +
                ((item.price * (item.discount ?? 0)) / 100) * item.quantity,
              0
            )
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </div>
      </Flex>
    </Flex>
  );
}
