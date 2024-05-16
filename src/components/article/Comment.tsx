import { Avatar, Card, Flex, Space } from "antd";
import React from "react";
import Meta from "antd/lib/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";

interface commentInterface {
  author: string;
  email: string;
  createdAt: string;
  status: string;
  content: string;
}
type Props = { comment: commentInterface };

export default function Comment({ comment }: Props) {
  return (
    <Card hoverable>
      <Flex justify="space-between" gap={20} wrap className="divide-x">
        <Space direction="vertical" size={10} align="center">
          <Avatar icon={<UserOutlined />} />
          <Meta
            title={
              <a
                href={"mailTo:" + comment.email}
                target="blank"
                style={{ textAlign: "center" }}
              >
                <Title level={4} style={{ color: "hsl(var(--foreground))" }}>
                  {comment.author}
                </Title>
              </a>
            }
            description=<div className="text-center">
              {dayjs(comment.createdAt).format("DD/MM/YYYY")}
            </div>
            style={{ alignItems: "center" }}
          />
        </Space>
        <div className="grow pl-4">{comment.content}</div>
      </Flex>
    </Card>
  );
}
