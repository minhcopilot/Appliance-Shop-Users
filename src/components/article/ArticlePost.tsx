import { Card, Space } from "antd";
import React from "react";
import { postSchema } from "./ArticleCard";
import parse from "html-react-parser";
import Meta from "antd/lib/card/Meta";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Title from "antd/lib/typography/Title";
import LikeButton from "./LikeButton";
type Props = {
  post: postSchema;
};

export default function ArticlePost({ post }: Props) {
  return (
    <Card
      cover={
        post.imageUrl ? (
          <img
            alt={post.title}
            src={post.imageUrl.url}
            style={{ height: 400, objectFit: "cover" }}
          />
        ) : (
          <div style={{ height: 400, backgroundColor: "#00000073" }}></div>
        )
      }
      style={{ margin: "0 50px", minWidth: "80%" }}
    >
      <LikeButton url={post.url} />
      <Space direction="vertical" size={20}>
        <Space direction="vertical" size={10}>
          <Meta
            description={
              <>
                <CalendarOutlined />{" "}
                {dayjs(post.createdAt).format("DD/MM/YYYY")}
              </>
            }
          />
          <Title level={2}>{post.title}</Title>
        </Space>
      </Space>
      {parse(post.content)}
    </Card>
  );
}