import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    query: string;
    page: number;
  };
};

export default async function BlogPage({ params: { page, query } }: Props) {
  const postList = await getSubject(
    `?type=post&page=${page}&limit=10&sort=-updatedAt&search=${query}`
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
