import { ArticleList } from "@/components/article/ArticleList";
import ArticleSearchBar from "@/components/article/ArticleSearchBar";
import { getSubject } from "@/hooks/blog/useGet";
import { Flex, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Metadata } from "next";
import React, { Suspense } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata: Metadata = {
  title: "Tìm kiếm Blog",
  description: "Tìm kiếm Blog của Gia dụng Đà Nẵng",
};

export default async function BlogSearch({ searchParams }: Props) {
  const { query, page } = searchParams;
  let post = null;
  if (query) {
    post = await getSubject(
      `article/posts/?type=post&page=${
        page || 1
      }&limit=10&sort=-updatedAt&search=${query}`
    );
  }
  return (
    <Content style={{ margin: "0 50px" }}>
      <Flex vertical gap={20}>
        <ArticleSearchBar />
        <ArticleList postList={post} />
      </Flex>
    </Content>
  );
}
