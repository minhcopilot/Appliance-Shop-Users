import { Flex } from "antd";
import React from "react";
import { ArticleCard, postSchema } from "./ArticleCard";

type Props = {
  postList: postSchema[];
};

export const ArticleList = ({ postList }: Props) => {
  return (
    <>
      <Flex gap={20} wrap align="start" justify="center">
        {postList.map((post, index) => {
          return <ArticleCard key={index} post={post} />;
        })}
      </Flex>
    </>
  );
};
