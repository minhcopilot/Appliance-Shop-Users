"use client";
import { axiosClient } from "@/lib/axiosClient";
import { Button, Form, Input, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

type Props = {
  url: string;
};

export default function CommentForm({ url }: Props) {
  const onFinish = async (data: any) => {
    const result = await axiosClient.post(
      "article/posts/" + url + "/comments",
      data
    );
    result.status === 201
      ? message.success("Bình luận đã được gửi để chờ kiểm duyệt")
      : message.error(result.data.message);
  };
  return (
    <Form onFinish={onFinish}>
      <FormItem
        name="author"
        rules={[
          { required: true, message: "Tên là bắt buộc" },
          { type: "string", message: "Tên không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <Input name="author" placeholder="Tên của bạn" />
      </FormItem>
      <FormItem
        name="email"
        rules={[
          { required: true, message: "Email là bắt buộc" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <Input name="email" placeholder="Email của bạn" />
      </FormItem>
      <FormItem
        name="content"
        rules={[
          { required: true, message: "Hãy điền bình luận của bạn!" },
          { type: "string", message: "Bình luận không hợp lệ" },
        ]}
        style={{ width: "100%" }}
      >
        <TextArea rows={3} name="content" placeholder="Bình luận của bạn" />
      </FormItem>
      <Button type="primary" htmlType="submit">
        Bình luận
      </Button>
    </Form>
  );
}
