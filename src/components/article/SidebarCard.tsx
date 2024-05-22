import { CalendarOutlined } from "@ant-design/icons";
import { Card, Flex, Space, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import Image from "next/image";
import { cropArticleCard } from "@/lib/utils";
import { postSchema } from "./ArticleCard";

type Props = {
  post: postSchema;
};

export const SidebarCard = ({ post }: Props) => {
  return (
    <Link href={"/blog/" + post.url} className="w-full">
      <Card
        className="w-full"
        style={{ backgroundColor: "hsl(var(--card))" }}
        size="small"
        hoverable
      >
        <Meta
          title={
            <Tooltip title={post.title}>
              <Title style={{ color: "hsl(var(--card-foreground))" }} level={5}>
                {post.title}
              </Title>
            </Tooltip>
          }
          avatar={
            post.imageUrl ? (
              <Image
                alt={post.title}
                src={cropArticleCard(post.imageUrl.url)}
                style={{ objectFit: "cover", width: 70, height: 70 }}
                height={70}
                width={70}
              />
            ) : (
              <div
                style={{ backgroundColor: "#00000073", width: 70, height: 70 }}
              ></div>
            )
          }
          description={
            <>
              <CalendarOutlined /> {dayjs(post.createdAt).format("DD/MM/YYYY")}
            </>
          }
        />
      </Card>
    </Link>
  );
};
