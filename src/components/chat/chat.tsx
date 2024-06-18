"use client";
import { CommentOutlined } from "@ant-design/icons";
import { Badge, Card, Flex, FloatButton } from "antd";
import React from "react";
import StartChat from "./StartChat";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import ChatContent from "./ChatContent";
import ChatDisconnect from "./ChatDisconnect";
import SendForm from "./SendForm";
import styles from "./ChatContent.module.css";

type Props = {};

export const Chat = ({}: Props) => {
  const { chatId, chatOpen, setChatOpen, unRead, setUnRead } = useChat(
    (state) => state
  );

  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      open={chatOpen}
      style={{ right: 24 }}
      icon={
        <Badge count={unRead} overflowCount={99} offset={[15, 15]}>
          <CommentOutlined style={{ color: "white" }} />{" "}
        </Badge>
      }
      onClick={() => {
        setChatOpen(!chatOpen);
        if (chatOpen) {
          setUnRead(0);
        }
      }}
    >
      <Card
        className={styles.chatCard}
        title="Chat với nhân viên hỗ trợ"
        extra={chatId && <ChatDisconnect chatId={chatId.id} />}
      >
        {chatId ? (
          <Flex
            vertical
            justify="space-between"
            gap={10}
            style={{ width: "100%", height: "calc(80vh - 85px)" }}
          >
            <ChatContent />
            {chatId && <SendForm chatId={chatId.id} />}
          </Flex>
        ) : (
          <StartChat />
        )}
      </Card>
    </FloatButton.Group>
  );
};
