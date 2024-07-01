"use client";
import { useAppContext } from "@/app/AppProvider";
import { useLoading } from "@/hooks/chat/useLoading";
import { chat, useChat, useSocket } from "@/hooks/chat/useSocket";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message } from "antd";
import { useTheme } from "next-themes";
const { Compact } = Space;
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {};

export type Theme = "light" | "dark";

export default function StartChat({}: Props) {
  const { sessionToken, user } = useAppContext();
  const { theme } = useTheme();
  const socket = useSocket();
  const { chatId, setChatId } = useChat((state) => state);
  const [isCaptchaVerified, setIsCaptchaVerified] = React.useState(false);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const [form] = Form.useForm();
  const { startLoading, setStartLoading } = useLoading((state) => state);

  const initialValues = {
    customerName: user && user?.lastName + " " + user?.firstName,
    phoneNumber: user?.phoneNumber,
  };

  const handleCaptchaChange = (value: any) => {
    setIsCaptchaVerified(!!value);
  };

  const serverMessageHandle = React.useCallback(
    (data: any) => {
      console.log(data);
      console.log("startchat listening");
      if (data.type === "chat-started") {
        setChatId({ ...chatId, ...data.message } as chat);
        setStartLoading(false);
        console.log("chat started");
      }
    },
    [chatId]
  );

  const startChat = async (data: any) => {
    const recaptchaToken = await recaptchaRef.current?.getValue();
    if (!recaptchaToken || !isCaptchaVerified) {
      message.error("Vui lòng xác minh bạn không phải là robot!");
      return;
    }
    setStartLoading(true);
    !socket.connected && socket.connect();
    socket.emit("client-message", {
      type: "start-chat",
      message: { ...data, customerId: user?.id, recaptchaToken },
    });
    socket.on("server-message", serverMessageHandle);
    return () => {
      socket.off("server-message");
    };
  };

  return (
    <>
      <Form form={form} onFinish={startChat} initialValues={initialValues}>
        <Form.Item
          name="customerName"
          rules={[{ required: true, message: "Vui lòng điền tên của bạn!" }]}
        >
          <Input
            name="customerName"
            placeholder="Tên của bạn"
            disabled={Boolean(user)}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng điền SĐT của bạn!" }]}
        >
          <Input
            name="phoneNumber"
            placeholder="Số điện thoại"
            disabled={Boolean(user)}
          />
        </Form.Item>

        <ReCAPTCHA
          ref={recaptchaRef}
          theme={theme as Theme}
          sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          onChange={handleCaptchaChange}
          style={{ width: "100%" }}
          className="recaptchaDiv"
        />
        <br />
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          loading={startLoading ? true : false}
        >
          Bắt đầu chat
        </Button>
      </Form>
    </>
  );
}
