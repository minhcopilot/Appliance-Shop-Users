"use client";
import { useLoading } from "@/hooks/chat/useLoading";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {};

export default function ChatProvider({ children }: React.PropsWithChildren) {
  const socket = useSocket();
  const QueryClient = useQueryClient();
  const { chatId, setChatId, chatOpen, setChatOpen, unRead, setUnRead } =
    useChat((state) => state);

  const { setDisconnectLoading } = useLoading((state) => state);
  const socketConnect = React.useCallback(() => {
    socket.connect();
    chatId &&
      socket.emit("client-message", {
        type: "customer-connected",
        message: chatId,
      });
  }, [socket, chatId]);

  const newMessageHandle = React.useCallback(
    (data: any) => {
      QueryClient.getQueryData(["chatContent", chatId?.id]) &&
        QueryClient.setQueryData(["chatContent", chatId?.id], (old: any) => [
          ...old,
          data,
        ]);
      !chatOpen && setUnRead(unRead + 1);
    },
    [chatId, chatOpen, unRead]
  );

  const disconnectHandle = React.useCallback((data: any) => {
    socket.disconnect();
    setChatId(null);
    setUnRead(0);
    setDisconnectLoading(false);
  }, []);

  React.useEffect(() => {
    if (!socket.connected) {
      socketConnect();
    }
  }, [chatId, socket]);
  React.useEffect(() => {
    socket.on("new-message", newMessageHandle);
    socket.on("disconnected", disconnectHandle);
    return () => {
      socket.off("disconnected");
      socket.off("new-message");
    };
  }, [socket, chatOpen, unRead]);
  return <>{children}</>;
}
