import Cart from "@/components/cart/Cart";
import { Flex } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import React from "react";

type Props = {};

export default function CartPage({}: Props) {
  return (
    <Flex style={{ backgroundColor: "inherit" }} wrap>
      <Content className="mx-14 my-3">
        <Cart />
      </Content>
      <Sider width={400} style={{ backgroundColor: "inherit" }}>
        Thanh toán
      </Sider>
    </Flex>
  );
}
