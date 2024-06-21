"use client";
import { useAppContext } from "@/app/AppProvider";
import { axiosClient } from "@/lib/axiosClient";
import { Button, Form, Input, Skeleton, message } from "antd";
import { useTheme } from "next-themes";
const { Item } = Form;
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Theme } from "../chat/StartChat";

type Props = {
  url: string;
};

export default function CommentForm({ url }: Props) {
  const { sessionToken, user } = useAppContext();
  const { theme } = useTheme();
  const [isCaptchaVerified, setIsCaptchaVerified] = React.useState(false);
  const [commentForm] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const initialValues = {
    author: user?.lastName + " " + user?.firstName,
    email: user?.email,
  };
  const handleCaptchaChange = (value: any) => {
    setIsCaptchaVerified(!!value);
  };
  const onFinish = async (data: any) => {
    const recaptchaToken = await recaptchaRef.current?.getValue();
    if (!recaptchaToken || !isCaptchaVerified) {
      message.error("Vui lòng xác minh bạn không phải là robot!");
      return;
    }
    setLoading(true);
    const result = await axiosClient.post(
      "article/posts/" + url + "/comments",
      { ...data, recaptchaToken }
    );
    commentForm.resetFields();
    setLoading(false);
    result.status === 201
      ? message.success("Bình luận đã được gửi để chờ kiểm duyệt")
      : message.error(result.data.message);
  };
  return (
    <Form
      onFinish={onFinish}
      initialValues={user ? initialValues : undefined}
      form={commentForm}
    >
      <Item
        name="author"
        rules={[
          { required: true, message: "Tên là bắt buộc" },
          { type: "string", message: "Tên không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <Input
          name="author"
          placeholder="Tên của bạn"
          disabled={Boolean(user)}
        />
      </Item>
      <Item
        name="email"
        rules={[
          { required: true, message: "Email là bắt buộc" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <Input
          name="email"
          placeholder="Email của bạn"
          disabled={Boolean(user)}
        />
      </Item>
      <Item
        name="content"
        rules={[
          { required: true, message: "Hãy điền bình luận của bạn!" },
          { type: "string", message: "Bình luận không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <Input.TextArea
          rows={3}
          name="content"
          placeholder="Bình luận của bạn"
        />
      </Item>
      <ReCAPTCHA
        ref={recaptchaRef}
        theme={theme as Theme}
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onChange={handleCaptchaChange}
        className="recaptchaDiv"
      />
      <br />
      <Button type="primary" htmlType="submit" loading={loading}>
        Bình luận
      </Button>
    </Form>
  );
}
