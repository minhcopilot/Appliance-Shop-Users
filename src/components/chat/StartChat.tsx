"use client";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";

type Props = {};

export default function StartChat({}: Props) {
  const socket = useSocket();
  const setChatId = useChat((state) => state.setChatId);
  const startChat = (data: any) => {
    socket.connect();
    socket.emit("client-message", {
      type: "start-chat",
      message: data.name,
    });
    console.log("Start Chat");
    socket.on("server-message", (data: any) => {
      console.log(data);
      if (data.type === "chat-started") {
        setChatId(data.message.id);
      }
    });
    return () => {
      socket.off("server-message");
    };
  };

  return (
    <>
      <Form onFinish={startChat}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            <SendOutlined /> Start Chat
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
