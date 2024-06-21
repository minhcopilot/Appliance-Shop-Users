"use client";
import { useAppContext } from "@/app/AppProvider";
import { useLoading } from "@/hooks/chat/useLoading";
import { useChat, useSocket } from "@/hooks/chat/useSocket";
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
  const setChatId = useChat((state) => state.setChatId);
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

  const startChat = async (data: any) => {
    const recaptchaToken = await recaptchaRef.current?.getValue();
    if (!recaptchaToken || !isCaptchaVerified) {
      message.error("Vui lòng xác minh bạn không phải là robot!");
      return;
    }
    setStartLoading(true);
    socket.connect();
    socket.emit("client-message", {
      type: "start-chat",
      message: { ...data, customerId: user?.id, recaptchaToken },
    });
    console.log("Start Chat");
    socket.on("server-message", (data: any) => {
      console.log(data);
      if (data.type === "chat-started") {
        setChatId(data.message);
      }
      setStartLoading(false);
    });
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
