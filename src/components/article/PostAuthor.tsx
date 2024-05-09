import { Avatar, Card } from "antd";
import React from "react";
import Meta from "antd/lib/card/Meta";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  authorName: string;
  authorId?: number;
};

export default function PostAuthor({ authorName, authorId }: Props) {
  return (
    <>
      <Card style={{ margin: "0 50px" }} hoverable>
        <Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} />}
          title={authorName}
          style={{ alignItems: "center" }}
        />
      </Card>
    </>
  );
}
