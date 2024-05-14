import { Flex } from "antd";
import React from "react";
import { ArticleCard, postSchema } from "./ArticleCard";
import ArticlePagination from "./ArticlePagination";

interface postResponseSchema {
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
};

export const ArticleList = ({ postList }: Props) => {
  if (!postList) return null;
  const { totalDocs, page, limit } = postList;
  return (
    <Flex vertical gap={30} align="center">
      <Flex gap={20} wrap align="start" justify="center">
        {postList.docs.map((post, index) => {
          return <ArticleCard key={index} post={post} />;
        })}
      </Flex>
      <ArticlePagination totalDocs={totalDocs} limit={limit} page={page} />
    </Flex>
  );
};
