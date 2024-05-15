"use client";
import React from "react";
import Message from "./Message";
import { Flex, FloatButton, Skeleton, Space, Spin } from "antd";
import { useGetContent } from "@/hooks/chat/useGet";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import styles from "./ChatContent.module.css";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";

type Props = {};

export default function ChatContent({}: Props) {
  let chatId = useChat((state) => state.chatId);
  let chatContent = useGetContent(chatId);
  const latestMessage = React.useRef<HTMLDivElement>(null);
  const scrollToLatest = () => {
    latestMessage.current?.scrollIntoView({ behavior: "smooth" });
  };
  const socket = useSocket();
  const QueryClient = useQueryClient();
  const setChatId = useChat((state) => state.setChatId);
  React.useEffect(() => {
    socket.connect();
    chatId &&
      socket.emit("client-message", {
        type: "customer-connected",
        message: chatId,
      });
    console.log("connected to chat: ", chatId?.toString());
    socket.on("new-message", (data: any) => {
      QueryClient.setQueryData(["chatContent", chatId], (old: any) => [
        ...old,
        data,
      ]);
      console.log("new message: ", data.content);
    });
    socket.on("disconnected", (data: any) => {
      console.log(`Disconneted from chat: ${data}`);
      socket.disconnect();
      console.log("socket disconnected");
      data === chatId && setChatId(null);
    });
    console.log("socket listening");
    return () => {
      socket.off("disconnected");
      socket.off("new-message");
    };
  }, []);
  React.useEffect(() => {
    scrollToLatest();
  }, [chatContent.data]);
  return (
    <div style={{ height: 450 }}>
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
    </div>
  );
}
