import { io } from "socket.io-client";
import { create, useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { createContext, useContext } from "react";
// import useAuth from "./OnlineShop/hooks/useAuth";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${process.env.NEXT_PUBLIC_baseURL}`;
export const useSocket = () => {
  // const token = useAuth((state) => state.token);
  return io(URL, {
    // extraHeaders: {
    //   Authorization: `Bearer  ${token}`,
    // },
    autoConnect: true,
  });
};

export interface chat {
  id: number;
  customerName: string;
  phoneNumber: string;
  employeeName?: string;
}

export type ChatState = {
  chatId: chat | null;
  unRead: number;
  chatOpen: boolean;
};

export type ChatAction = {
  setChatId: (chatId: any) => void;
  setUnRead: (unRead: number) => void;
  setChatOpen: (chatOpen: boolean) => void;
};

export type chatId = ChatState & ChatAction;

export const defaultInitState: ChatState = {
  chatId: null,
  unRead: 0,
  chatOpen: false,
};

export const createChatStore = (initState: ChatState = defaultInitState) => {
  return createStore<chatId>()(
    persist(
      (set) => ({
        ...initState,
        setChatId: (chatId) => set({ chatId }),
        setUnRead: (unRead) => set({ unRead }),
        setChatOpen: (chatOpen) => set({ chatOpen }),
      }),
      { name: "chatId" }
    )
  );
};

export type chatStoreApi = ReturnType<typeof createChatStore>;

export const ChatStoreContext = createContext<chatStoreApi | undefined>(
  undefined
);

export const useChat = <T>(selector: (store: chatId) => T): T => {
  const counterStoreContext = useContext(ChatStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
