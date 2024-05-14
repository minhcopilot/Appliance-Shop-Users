import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    page: number;
  };
};

export default async function BlogPage({ params: { page } }: Props) {
  const postList = await getSubject(`article/posts/?page=${page}&limit=10`);
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
