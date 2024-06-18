"use client";
import { useLoading } from "@/hooks/chat/useLoading";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { Button } from "antd";
import React from "react";

type Props = {
  chatId: number | null;
};

export default function ChatDisconnect({ chatId }: Props) {
  const socket = useSocket();
  const { disconnectLoading, setDisconnectLoading } = useLoading(
    (state) => state
  );
  const disconnect = () => {
    socket.connect();
    socket.emit("client-message", {
      type: "close-chat",
      message: chatId,
    });
    setDisconnectLoading(true);
    console.log(`Disconnecting chat: ${chatId}`);
  };
  return (
    <Button
      type="primary"
      danger
      onClick={disconnect}
      loading={disconnectLoading ? true : false}
    >
      Disconnect Chat
    </Button>
  );
}
