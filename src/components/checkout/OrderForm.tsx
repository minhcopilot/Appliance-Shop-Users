"use client";
import { Button, Form, Input, Radio, Space, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useAdd from "@/hooks/useAdd";
import { OrderItem, useOrder } from "@/hooks/useOrder";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAppContext } from "@/app/AppProvider";
import TotalPriceVoucher from "@/components/checkout/TotalPriceVoucher";
import { axiosClient } from "@/lib/axiosClient";

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
  const [voucherCode, setVoucherCode] = React.useState<string | null>(null);

  const submitOrder = async (data: any) => {
    if (voucherCode) {
      await applyVoucher(voucherCode);
    }
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

  const applyVoucher = async (voucherCode: string) => {
    try {
      const response = await axiosClient.post(`/vouchers/apply-voucher`, {
        voucherCode,
      });
      if (response.status === 200) {
        message.success("Áp dụng voucher thành công!");
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const handleVoucherSelect = (voucherCode: string | null) => {
    setVoucherCode(voucherCode);
    orderForm.setFieldsValue({ voucherCode });
  };
  return (
    <div className="flex justify-center mt-5 space-x-4">
      <div className="max-w-2xl w-full">
        <Form
          form={orderForm}
          onFinish={submitOrder}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "600px", width: "100%" }}
          initialValues={user ? user : undefined}
        >
          <h1 className="mb-5 text-xl font-semibold text-center uppercase">
            Thông tin đặt hàng
          </h1>
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
              {
                required: true,
                message: "Địa chỉ giao hàng không được bỏ trống",
              },
            ]}
          >
            <Input.TextArea
              name="shippingAddress"
              autoSize
              style={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item
            name="shippingCity"
            label="Thành phố giao hàng"
            rules={[
              { type: "string" },
              {
                required: true,
                message: "Thành phố giao hàng không được bỏ trống",
              },
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
              {
                required: true,
                message: "Phương thức thanh toán không được bỏ trống",
              },
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
              { max: 300, message: "Ghi chú không được quá dài" },
            ]}
          >
            <Input.TextArea
              name="description"
              autoSize
              style={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item name="voucherCode" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            className="flex justify-end"
            wrapperCol={{ span: 24, offset: 8 }}
          >
            <Space>
              <Button type="primary" onClick={() => orderForm.submit()}>
                Đặt hàng
              </Button>
              <Button onClick={() => orderForm.resetFields()}>Làm mới</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <TotalPriceVoucher
        items={orderItems}
        onVoucherSelect={handleVoucherSelect}
      />
    </div>
  );
}
