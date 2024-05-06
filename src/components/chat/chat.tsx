"use client";
import { CommentOutlined } from "@ant-design/icons";
import { Avatar, Card, FloatButton } from "antd";
import React from "react";
import StartChat from "./StartChat";
import { useChat } from "@/hooks/chat/useSocket";
import ChatContent from "./ChatContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatDisconnect from "../ChatDisconnect";

type Props = {};

export const Chat = ({}: Props) => {
  const queryClient = new QueryClient();
  const chatId = useChat((state) => state.chatId);
  return (
    <QueryClientProvider client={queryClient}>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<CommentOutlined />}
      >
        <Card
          style={{
            width: 300,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          title="Chat"
          extra={chatId && <ChatDisconnect chatId={chatId} />}
        >
          {chatId ? <ChatContent /> : <StartChat />}
        </Card>
      </FloatButton.Group>
    </QueryClientProvider>
  );
};
