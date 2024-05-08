import { io } from "socket.io-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import useAuth from "./OnlineShop/hooks/useAuth";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:9000";
export const useSocket = () => {
  // const token = useAuth((state) => state.token);
  return io(URL, {
    // extraHeaders: {
    //   Authorization: `Bearer  ${token}`,
    // },
    autoConnect: false,
  });
};

interface chatId {
  chatId: number | null;
  setChatId: (chatId: number | null) => void;
}

export const useChat = create<chatId>()(
  persist(
    (set) => ({
      chatId: null,
      setChatId: (chatId) => set({ chatId }),
    }),
    { name: "chatId" }
  )
);
