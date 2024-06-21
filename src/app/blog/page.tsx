import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Blog Gia dụng Đà Nẵng",
  description: "Trang Blog của Gia dụng Đà Nẵng",
};

export default async function Blog() {
  const postList = await getSubject(
    "article/posts/?type=post&page=1&limit=10&sort=-updatedAt"
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
