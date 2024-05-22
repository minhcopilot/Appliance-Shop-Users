import { Avatar, Card } from "antd";
import React from "react";
import Meta from "antd/lib/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

type Props = {
  authorName: string;
  authorId?: number;
};

export default function PostAuthor({ authorName, authorId }: Props) {
  return (
    <Link href={`/blog/author/${authorId}`}>
      <Card
        style={{ margin: "0 50px", maxWidth: 350, textAlign: "center" }}
        hoverable
      >
        <Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} />}
          title={authorName}
          style={{ alignItems: "center" }}
        />
      </Card>
    </Link>
  );
}
