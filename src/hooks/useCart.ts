import { axiosClient } from "@/lib/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// the store itself does not need any change
export interface CartItem {
  productId: number;
  product?: any;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  setItems: (items: CartItem[], token?: string) => void;
  getItems: (token: string) => void;
  setCart: (token: string) => void;
  addItem: (item: CartItem, token?: string) => void;
  decreaseItem: (productId: number, token?: string) => void;
  removeItem: (productId: number, token?: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      setItems: (items, token) => {
        set({ items });
        token && get().setCart(token);
      },
      getItems: async (token) => {
        const items = get().items;
        let result = await axiosClient.get("/user/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          result.data.forEach((item: CartItem) => {
            let found = items.find((x) => x.productId === item.productId);
            if (found) {
              found.quantity = item.quantity;
            } else {
              items.push(item);
            }
          });
        }
        set({ items });
      },
      setCart: async (token) => {
        const data = get().items.map((x) => ({
          productId: x.productId,
          quantity: x.quantity,
        }));
        await axiosClient.post("/user/cart", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      },
      addItem: (item, token) => {
        const items = get().items;
        const found = items.find((x) => x.productId === item.productId);
        if (found) {
          found.quantity += item.quantity;
        } else {
          items.push(item);
        }
        set({ items });
        token && get().setCart(token);
      },
      decreaseItem: (productId, token) => {
        const items = get().items;
        const found = items.find((x) => x.productId === productId);
        if (found) {
          found.quantity--;
          if (found.quantity <= 0) {
            set({ items: items.filter((x) => x.productId !== productId) });
            token && get().removeItem(productId, token);
          } else {
            set({ items });
            token && get().setCart(token);
          }
        }
      },
      removeItem: (productId, token) => {
        const items = get().items;
        set({ items: items.filter((x) => x.productId !== productId) });
        token &&
          axiosClient.delete("/user/cart/" + productId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart",
    }
  )
);
