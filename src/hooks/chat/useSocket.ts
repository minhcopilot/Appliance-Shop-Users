import { io } from "socket.io-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import useAuth from "./OnlineShop/hooks/useAuth";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${process.env.NEXT_PUBLIC_baseURL}`;
export const useSocket = () => {
  // const token = useAuth((state) => state.token);
  return io(URL, {
    // extraHeaders: {
    //   Authorization: `Bearer  ${token}`,
    // },
    autoConnect: false,
  });
};

interface chat {
  id: number;
  customerName: string;
  phoneNumber: string;
}

interface chatId {
  chatId: chat | null;
  setChatId: (chatId: chat | null) => void;
  employee: string | null;
  setEmployee: (employee: string | null) => void;
  unRead: number;
  setUnRead: (unRead: number) => void;
  chatOpen: boolean;
  setChatOpen: (chatOpen: boolean) => void;
}

export const useChat = create<chatId>()(
  persist(
    (set) => ({
      chatId: null,
      setChatId: (chatId) => set({ chatId }),
      employee: null,
      setEmployee: (employee) => set({ employee }),
      unRead: 0,
      setUnRead: (unRead) => set({ unRead }),
      chatOpen: false,
      setChatOpen: (chatOpen) => set({ chatOpen }),
    }),
    { name: "chatId" }
  )
);
