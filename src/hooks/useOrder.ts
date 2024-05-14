import { axiosClient } from "@/lib/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCart";

// the store itself does not need any change
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  discount: number;
}

interface OrderAddItem extends CartItem {
  price?: number;
  discount?: number;
}

export interface OrderStore {
  orderItems: OrderItem[];
  setOrderItems: (items: OrderAddItem[]) => void;
}

export const useOrder = create<OrderStore>()((set, get) => ({
  orderItems: [],
  setOrderItems: (OrderAddItem) => {
    let newOrderItems = OrderAddItem.map((value, index) => {
      return {
        productId: value.productId,
        quantity: value.quantity,
        price: value.product?.price || value.price,
        discount: value.product?.discount || value.discount,
      };
    });
    set({ orderItems: newOrderItems });
  },
}));
