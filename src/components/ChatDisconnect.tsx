import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { Button } from "antd";
import { m } from "framer-motion";
import React from "react";

type Props = {
  chatId: number | null;
};

export default function ChatDisconnect({ chatId }: Props) {
  const socket = useSocket();
  const setChatId = useChat((state) => state.setChatId);
  const disconnect = () => {
    socket.connect();
    socket.emit("client-message", {
      type: "close-chat",
      message: { id: chatId },
    });
    socket.disconnect();
    setChatId(null);
  };
  return (
    <Button type="primary" danger onClick={disconnect}>
      Disconnect Chat
    </Button>
  );
}
