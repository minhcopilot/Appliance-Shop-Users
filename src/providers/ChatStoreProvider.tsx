"use client";
import {
  ChatStoreContext,
  chatStoreApi,
  createChatStore,
} from "@/hooks/chat/useSocket";
import React, { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
};

export const ChatStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<chatStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createChatStore();
  }

  return (
    <ChatStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatStoreContext.Provider>
  );
};
