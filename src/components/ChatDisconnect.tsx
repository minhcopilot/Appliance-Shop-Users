"use client";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { Button } from "antd";
import React from "react";

type Props = {
  chatId: number | null;
};

export default function ChatDisconnect({ chatId }: Props) {
  const socket = useSocket();
  const disconnect = () => {
    socket.connect();
    socket.emit("client-message", {
      type: "close-chat",
      message: chatId,
    });
    console.log(`Disconnecting chat: ${chatId}`);
  };
  return (
    <Button type="primary" danger onClick={disconnect}>
      Disconnect Chat
    </Button>
  );
}
