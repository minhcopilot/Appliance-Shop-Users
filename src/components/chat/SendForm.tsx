"use client";
import { useSocket } from "@/hooks/chat/useSocket";
import { Button, Form, Input, Space } from "antd";
import React from "react";

type Props = { chatId: number | null };

export default function SendForm({ chatId }: Props) {
  const [chatForm] = Form.useForm();
  const socket = useSocket();
  const sendMessage = (data: any) => {
    socket.connect();
    socket.emit("client-message", {
      type: "new-message",
      message: {
        chatId,
        type: "text",
        content: data.message,
      },
    });
    chatForm.resetFields();
  };

  return (
    <Form form={chatForm} onFinish={sendMessage} style={{ width: "100%" }}>
      <Space.Compact block>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
          style={{ width: "100%" }}
        >
          <Input autoFocus name="message" placeholder="Type a message" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Space.Compact>
    </Form>
  );
}
