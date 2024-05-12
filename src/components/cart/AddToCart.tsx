"use client";
import { useAppContext } from "@/app/AppProvider";
import { useCart } from "@/hooks/useCart";
import { Button, Space } from "antd";
import { get } from "http";
import React from "react";
import { FaCartPlus } from "react-icons/fa";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
  product: any;
};

export default function AddToCartButton({
  product,
  className,
  style,
  compact,
}: Props) {
  const { addItem, setCart, getItems } = useCart((state) => state);
  const { sessionToken } = useAppContext();
  const addToCart = () => {
    addItem({ productId: product.id, product, quantity: 1 }, sessionToken);
    useCart.persist.rehydrate();
  };
  return (
    <button className={className} style={style} onClick={addToCart}>
      {compact ? (
        <FaCartPlus />
      ) : (
        <Space>
          <FaCartPlus /> Thêm vào giỏ hàng
        </Space>
      )}
    </button>
  );
}
