"use client";
import { Form, Input, Radio, Space, message, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useAdd from "@/hooks/useAdd";
import { OrderItem, useOrder } from "@/hooks/useOrder";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAppContext } from "@/app/AppProvider";
import TotalPriceVoucher from "@/components/checkout/TotalPriceVoucher";
import { axiosClient } from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import SuccessModal from "@/components/ui/SuccessModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Props = {};

dayjs.extend(customParseFormat);
dayjs.extend(utc);
const timeFormat = "HH:mm";

export default function OrderForm({}: Props) {
  const { setOrderItems } = useOrder((state) => state);
  const { removeItem } = useCart((state) => state);
  const token = useAppContext().sessionToken;
  const user: any = useAppContext().user;
  const searchParams = useSearchParams();
  const orderItems = JSON.parse(
    searchParams.get("orderItems") || "[]"
  ) as OrderItem[];
  const [orderForm] = Form.useForm();
  const query = useAdd("/orders");
  const [voucherCode, setVoucherCode] = React.useState<string | null>(null);
  const [cities, setCities] = React.useState<any>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const loggedin = user ? true : false;

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      const data = await response.json();
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const submitOrder = async (data: any) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setIsLoading(true);
    const orderData = { ...data, orderDetails: orderItems };
    orderData.customerId = user.id;
    try {
      if (voucherCode) {
        await applyVoucher(voucherCode);
      }
      if (data.paymentType === "MOMO") {
        const response = await axiosClient.post(
          "/orders/momo-payment",
          orderData
        );

        if (response.data && response.data.payUrl) {
          orderItems.forEach((item) => {
            removeItem(item.productId, token);
          });
          setOrderItems([]);
          orderForm.resetFields();
          window.location.href = response.data.payUrl;
        } else {
          message.error("Thanh toán MoMo thất bại");
        }
      } else {
        const result = await query.mutateAsync(orderData);
        if (result) {
          setShowSuccessModal(true);
          await new Promise((resolve: any) => {
            setTimeout(() => {
              setShowSuccessModal(false);
              resolve();
            }, 3000);
          });
          orderItems.forEach((item) => {
            removeItem(item.productId, token);
          });
          orderForm.resetFields();
          setOrderItems([]);
          router.push("/profile/order");
        } else {
          message.error("Đặt hàng không thành công");
        }
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đặt hàng");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const applyVoucher = async (voucherCode: string) => {
    try {
      const response = await axiosClient.post(`/vouchers/apply-voucher`, {
        voucherCode,
      });
      if (response.status === 200) {
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
    // Apply voucher
    if (voucherCode) {
      applyVoucher(voucherCode);
      message.success("Áp dụng voucher thành công!");
    }
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
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            title="Đặt hàng thành công!"
            content="Cảm ơn bạn đã đặt hàng, chúng tôi sẽ giao hàng cho bạn sớm nhất!"
          />
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
              {
                required: true,
                message: "Thành phố giao hàng không được bỏ trống",
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              placeholder="Chọn thành phố"
            >
              {cities.map((city: any) => (
                <Select.Option key={city.id} value={city.name}>
                  {city.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="paymentType"
            label="Phương thức thanh toán"
            rules={[
              {
                type: "enum",
                enum: ["CASH", "MOMO"],
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
                { value: "CASH", label: "Tiền mặt" },
                { value: "MOMO", label: "Ví MoMo" },
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
              <Button onClick={() => orderForm.submit()}>
                {isLoading ? <LoadingSpinner /> : "Đặt hàng"}
              </Button>
              {/* <Button onClick={() => orderForm.resetFields()}>Làm mới</Button> */}
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
