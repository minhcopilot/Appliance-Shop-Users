import { Card, Flex } from "antd";
import React from "react";
import { postSchema } from "./ArticleCard";
import { SidebarCard } from "./SidebarCard";

export interface postResponseSchema {
  docs: postSchema[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPrevPage: boolean;
  prevPage: number | null;
  pagingCounter: number;
}

type Props = {
  postList: postResponseSchema;
  title?: string;
};

export const SidebarList = ({ postList, title }: Props) => {
  if (!postList) return null;
  return (
    <Card title={title}>
      <Flex vertical gap={20} align="start" className="w-full">
        {postList.docs.map((post) => {
          return <SidebarCard key={title + post.id} post={post} />;
        })}
      </Flex>
    </Card>
  );
};
