import React from "react";
import Message from "./Message";
import { Space, Spin } from "antd";
import SendForm from "./SendForm";
import { useGetContent } from "@/hooks/chat/useGet";
import { useChat } from "@/hooks/chat/useSocket";

type Props = {};

export default function ChatContent({}: Props) {
  let chatId = useChat((state) => state.chatId);
  let chatContent = useGetContent(chatId);
  return (
    <Space direction="vertical" style={{ height: "100%", width: "100%" }}>
      {chatContent.isLoading && <Spin />}
      {chatContent.isSuccess && (
        <Space direction="vertical" style={{ height: "100%", width: "100%" }}>
          {chatContent.data.map((message: any) => (
            <Message message={message} />
          ))}
        </Space>
      )}
      {chatId && <SendForm chatId={chatId} />}
    </Space>
  );
}
