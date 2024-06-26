"use client";
import { useLoading } from "@/hooks/chat/useLoading";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

type Props = {};

export default function ChatProvider({ children }: React.PropsWithChildren) {
  const socket = useSocket();
  const QueryClient = useQueryClient();
  const {
    chatId,
    setChatId,
    setEmployee,
    chatOpen,
    setChatOpen,
    unRead,
    setUnRead,
  } = useChat((state) => state);

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
    setEmployee(null);
    setUnRead(0);
    setDisconnectLoading(false);
  }, []);

  const errorHandle = React.useCallback((data: any) => {
    disconnectHandle(data);
    message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    console.log(data.message);
  }, []);
  const serverHandle = React.useCallback((data: any) => {
    if (data.type === "chat-accepted") {
      setEmployee(data.message?.employee);
    }
  }, []);
  React.useEffect(() => {
    if (!socket.connected) {
      socketConnect();
    }
  }, [chatId, socket]);
  React.useEffect(() => {
    socket.on("new-message", newMessageHandle);
    socket.on("disconnected", disconnectHandle);
    socket.on("error", errorHandle);
    socket.on("server-message", serverHandle);
    return () => {
      socket.off("disconnected");
      socket.off("new-message");
      socket.off("error");
      socket.off("server-message");
    };
  }, [socket, chatOpen, unRead]);
  return <>{children}</>;
}
