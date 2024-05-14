"use client";
import { CommentOutlined } from "@ant-design/icons";
import { Card, Flex, FloatButton } from "antd";
import React from "react";
import StartChat from "./StartChat";
import { useChat } from "@/hooks/chat/useSocket";
import ChatContent from "./ChatContent";
import ChatDisconnect from "./ChatDisconnect";
import SendForm from "./SendForm";

type Props = {};

export const Chat = ({}: Props) => {
  const chatId = useChat((state) => state.chatId);

  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      icon={<CommentOutlined />}
    >
      <Card
        style={{
          width: 400,
          height: 600,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
        title="Chat với nhân viên hỗ trợ"
        extra={chatId && <ChatDisconnect chatId={chatId} />}
      >
        {chatId ? (
          <Flex
            vertical
            justify="space-between"
            gap={10}
            style={{ width: "100%" }}
          >
            <ChatContent />
            {chatId && <SendForm chatId={chatId} />}
          </Flex>
        ) : (
          <StartChat />
        )}
      </Card>
    </FloatButton.Group>
  );
};
