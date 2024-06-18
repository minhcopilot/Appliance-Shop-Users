"use client";
import React from "react";
import Message from "./Message";
import { Flex, FloatButton, Skeleton, Space, Spin } from "antd";
import { useGetContent } from "@/hooks/chat/useGet";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import styles from "./ChatContent.module.css";
import { ArrowDownOutlined } from "@ant-design/icons";

type Props = {};

export default function ChatContent({}: Props) {
  let { chatId } = useChat((state) => state);
  let chatContent = useGetContent();
  const latestMessage = React.useRef<HTMLDivElement>(null);
  const scrollToLatest = () => {
    latestMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToLatest();
  }, [chatContent.data]);
  return (
    <Skeleton loading={chatContent.isLoading} active>
      <Flex vertical className={styles.container + " px-2"} gap={10}>
        <FloatButton
          icon={<ArrowDownOutlined />}
          onClick={scrollToLatest}
          tooltip="Scroll to latest"
          style={{
            position: "absolute",
            right: 24,
            bottom: 80,
            opacity: 0.5,
          }}
        />
        {chatContent.isSuccess &&
          chatContent.data?.map((message: any) => (
            <Message
              key={message._id || Math.random().toString(16).slice(2)}
              message={message}
            />
          ))}
        <div ref={latestMessage} />
      </Flex>
    </Skeleton>
  );
}
