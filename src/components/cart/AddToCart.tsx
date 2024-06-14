"use client";
import { useAppContext } from "@/app/AppProvider";
import { useCart } from "@/hooks/useCart";
import { Button, Space } from "antd";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { Link } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
  product: any;
  quantity: number;
};

export default function AddToCartButton({
  product,
  className,
  style,
  compact,
  quantity,
}: Props) {
  const router = useRouter();
  const { addItem, setCart, getItems } = useCart((state) => state);
  const { sessionToken } = useAppContext();
  const addToCart = () => {
    addItem({ productId: product.id, product, quantity }, sessionToken);
    useCart.persist.rehydrate();
    toast({
      title: "Thêm sản phẩm thành công",
      description: "Sản phẩm đã được thêm vào giỏ hàng",
      action: (
        <ToastAction
          altText="Goto account settings to upgrade"
          onClick={() => {
            router.push("/cart");
          }}
        >
          Xem giỏ hàng
        </ToastAction>
      ),
    });
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
