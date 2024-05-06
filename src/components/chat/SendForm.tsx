import { useSocket } from "@/hooks/chat/useSocket";
import { Button, Input, Space } from "antd";
import React from "react";

type Props = { chatId: number | null };

export default function SendForm({ chatId }: Props) {
  const [message, setMessage] = React.useState("");
  const socket = useSocket();
  const sendMessage = () => {
    socket.connect();
    socket.emit("client-message", {
      type: "new-message",
      message: {
        chatId,
        type: "text",
        content: message,
      },
    });
    setMessage("");
  };
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        value={message}
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        placeholder="Type a message"
      />
      <Button type="primary" onClick={sendMessage}>
        Send
      </Button>
    </Space.Compact>
  );
}
