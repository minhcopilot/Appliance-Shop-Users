import { getSubject } from "@/hooks/blog/useGet";
import {
  CalendarOutlined,
  CommentOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Flex, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import dayjs from "dayjs";

type Props = {
  post: postSchema;
};

export interface imageUrlSchema {
  url: string;
  publicId: string;
  name: string;
  size: number;
  id: string;
}

export interface categorySchema {
  id: string;
  title: string;
  imageUrl?: imageUrlSchema;
  description?: string;
  parentId?: string;
  url?: string;
  isDeleted?: boolean;
  parentCategory?: categorySchema;
}

export interface postSchema {
  id: string;
  type?: string;
  postCategoryId?: string;
  category?: categorySchema;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  url: string;
  imageUrl?: imageUrlSchema;
  status?: string;
  commentStatus?: string;
  like: number;
  createdAt: string;
  updatedAt?: string;
  updatedBy?: string;
  commentsCount: number;
}

export const ArticleCard = async ({ post }: Props) => {
  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <Link key="edit" href={"/blog/" + post.url}>
            {post.imageUrl ? (
              <img
                alt={post.title}
                src={post.imageUrl.url}
                style={{ height: 200 }}
              />
            ) : (
              <div style={{ height: 200, backgroundColor: "#00000073" }}></div>
            )}
          </Link>
        }
        actions={[
          <Link key={"open" + post.id} href={"/post/" + post.url}>
            Read more
          </Link>,
        ]}
        hoverable
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Space direction="vertical" size={10}>
            <Meta
              description={
                <>
                  <CalendarOutlined />{" "}
                  {dayjs(post.createdAt).format("DD/MM/YYYY")}
                </>
              }
            />
            <Link key="edit" href={"/blog/" + post.url}>
              <Meta title={post.title} />
            </Link>
            <Paragraph
              ellipsis={{ rows: 1, expandable: "collapsible" }}
              style={{ minHeight: "2lh" }}
            >
              {post.content}
            </Paragraph>
          </Space>

          <Flex justify="space-between">
            <Meta
              avatar={<UserOutlined />}
              //   title={post.authorName}
              description={post.authorName}
              style={{ alignItems: "center" }}
            />
            <Space>
              {post.like + " "} <HeartOutlined />{" "}
              {"  " + post.commentsCount + " "}
              <CommentOutlined />
            </Space>
          </Flex>
        </Space>
      </Card>
    </>
  );
};
