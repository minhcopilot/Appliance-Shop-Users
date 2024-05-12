"use client";
import { Button, Flex, Form, Input, Radio, Space, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextArea from "antd/lib/input/TextArea";
import useAdd from "@/hooks/useAdd";
import { OrderItem, useOrder } from "@/hooks/useOrder";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAppContext } from "@/app/AppProvider";

type Props = {};

dayjs.extend(customParseFormat);
dayjs.extend(utc);
const timeFormat = "HH:mm";
const dateFormat = "DD/MM/YYYY " + timeFormat;

export default function OrderForm({}: Props) {
  const { setOrderItems } = useOrder((state) => state);
  const { removeItem } = useCart((state) => state);
  const token = useAppContext().sessionToken;
  const user = useAppContext().user;
  const searchParams = useSearchParams();
  const orderItems = JSON.parse(
    searchParams.get("orderItems") || "[]"
  ) as OrderItem[];
  const [orderForm] = Form.useForm();
  const query = useAdd("/orders");
  const submitOrder = (data: any) => {
    query.mutate({ ...data, orderDetails: orderItems });
  };
  const Router = useRouter();
  const loggedin = user ? true : false;

  React.useEffect(() => {
    if (query.isSuccess) {
      orderItems.forEach((item) => {
        removeItem(item.productId, token);
      });
      setOrderItems([]);
      message.success("Đặt hàng thành công");
      orderForm.resetFields();
      Router.replace("/cart");
    }
    if (query.isError) {
      message.error(query.error.message || "Đặt hàng thất bại");
    }
  }, [query]);

  return (
    <Flex vertical gap={10}>
      <Form
        form={orderForm}
        onFinish={submitOrder}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
        initialValues={user ? user : undefined}
      >
        <Form.Item
          name="firstName"
          label="Tên"
          rules={[
            { type: "string" },
            { required: true, message: "Tên không được bỏ trống" },
            { max: 100, message: "Tên khách hàng không được quá dài" },
          ]}
        >
          <Input name="firstName" type="text" disabled={loggedin}></Input>
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Họ và tên đệm"
          rules={[
            { type: "string" },
            { max: 100, message: "Tên khách hàng không được quá dài" },
          ]}
        >
          <Input name="lastName" type="text" disabled={loggedin}></Input>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Email không hợp lệ" },
            { required: true, message: "Email không được bỏ trống" },
            { max: 300, message: "Email không được quá dài" },
          ]}
        >
          <Input name="email" type="text" disabled={loggedin}></Input>
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { type: "string", message: "Số điện thoại không hợp lệ" },
            { required: true, message: "Số điện thoại không được bỏ trống" },
            { max: 12, message: "Số điện thoại không hợp lệ" },
          ]}
        >
          <Input addonBefore="+84" name="phoneNumber" type="number"></Input>
        </Form.Item>
        <Form.Item
          name="shippingAddress"
          label="Địa chỉ giao hàng"
          rules={[
            { type: "string" },
            // { required: true, message: "Shipping Address is required" },
          ]}
        >
          <TextArea name="shippingAddress" autoSize></TextArea>
        </Form.Item>
        <Form.Item
          name="shippingCity"
          label="Thành phố giao hàng"
          rules={[
            { type: "string" },
            // { required: true, message: "Shipping City is required" },
          ]}
        >
          <Input name="shippingCity" type="text"></Input>
        </Form.Item>
        <Form.Item
          name="paymentType"
          label="Phương thức thanh toán"
          rules={[
            {
              type: "enum",
              enum: ["CASH", "CREDIT CARD"],
              message: "Phương thức thanh toán không hợp lệ",
            },
            // { required: true, message: "Payment Type is required" },
          ]}
        >
          <Radio.Group
            optionType="button"
            options={[
              { value: "CASH", label: "Cash" },
              { value: "CREDIT CARD", label: "Credit Card", disabled: true },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Ghi chú"
          rules={[
            { type: "string" },
            // { required: true, message: "Description is required" },
            { max: 300, message: "Ghi chú không được quá dài" },
          ]}
        >
          <TextArea name="description" autoSize></TextArea>
        </Form.Item>
      </Form>
      <Form.Item wrapperCol={{ sm: { offset: 6 } }}>
        <Space>
          <Button type="primary" onClick={() => orderForm.submit()}>
            Add
          </Button>
          <Button onClick={() => orderForm.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
}
