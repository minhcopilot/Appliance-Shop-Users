"use client";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
const { Compact } = Space;
import React from "react";

type Props = {};

export default function StartChat({}: Props) {
  const socket = useSocket();
  const setChatId = useChat((state) => state.setChatId);
  const [form] = Form.useForm();
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
      <Form form={form} onFinish={startChat}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng điền tên của bạn!" }]}
        >
          <Compact block>
            <Input name="name" placeholder="Tên của bạn" />
            <Button type="primary" onClick={form.submit}>
              <div className="flex items-center gap-1">
                <SendOutlined /> Bắt đầu chat
              </div>
            </Button>
          </Compact>
        </Form.Item>
      </Form>
    </>
  );
}
