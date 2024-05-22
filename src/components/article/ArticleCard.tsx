import {
  CalendarOutlined,
  CommentOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Flex, Space, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import Image from "next/image";
import { cropArticleCard } from "@/lib/utils";

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
        className="w-[400px]"
        style={{ backgroundColor: "hsl(var(--card))" }}
        cover={
          <Link key="edit" href={"/blog/" + post.url}>
            {post.imageUrl ? (
              <Image
                alt={post.title}
                src={cropArticleCard(post.imageUrl.url)}
                width={400}
                height={200}
                style={{ height: 200, objectFit: "cover" }}
              />
            ) : (
              <div style={{ height: 200, backgroundColor: "#00000073" }}></div>
            )}
          </Link>
        }
        hoverable
      >
        <Flex vertical gap={20} className="w-full">
          <Flex vertical gap={20} className="w-full">
            <Meta
              description={
                <>
                  <CalendarOutlined />{" "}
                  {dayjs(post.createdAt).format("DD/MM/YYYY")}
                </>
              }
            />
            <Link key="edit" href={"/blog/" + post.url}>
              <Meta
                title={
                  <Tooltip title={post.title}>
                    <Title
                      style={{ color: "hsl(var(--card-foreground))" }}
                      level={5}
                    >
                      {post.title}
                    </Title>
                  </Tooltip>
                }
              />
            </Link>
            <Paragraph
              ellipsis={{
                rows: 2,
                expandable: "collapsible",
                symbol: "thêm",
              }}
              className="min-h-8"
              style={{ color: "hsl(var(--card-foreground))" }}
            >
              {post.content}
            </Paragraph>
          </Flex>

          <Flex justify="space-between">
            <Meta
              avatar={<UserOutlined />}
              //   title={post.authorName}
              description={post.authorName}
              className="flex items-center gap-2"
            />
            <Space>
              {post.like + " "} <HeartOutlined />{" "}
              {"  " + post.commentsCount + " "}
              <CommentOutlined />
            </Space>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
