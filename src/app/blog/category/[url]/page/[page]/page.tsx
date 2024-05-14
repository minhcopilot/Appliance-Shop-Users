import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    page: number;
    url: string;
  };
};

export default async function Blog({ params: { page, url } }: Props) {
  const postList = await getSubject(
    `article/posts/?category=${url}&page=${page}&limit=10`
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
