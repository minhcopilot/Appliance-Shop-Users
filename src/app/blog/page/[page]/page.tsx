import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    page: number;
  };
};

export const generateStaticParams = async () => {
  const postList = await getSubject(`article/posts/?type=post`);
  let totalPages = postList.totalPages;
  let paths: any[] = [];
  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    });
  }
  return paths;
};

export async function generateMetadata({ params }: Props) {
  const { page } = params;

  return {
    title: "Blog - Trang " + page,
    description: "Blog - Trang " + page,
  };
}

export default async function BlogPage({ params: { page } }: Props) {
  const postList = await getSubject(
    `article/posts/?type=post&page=${page}&limit=10&sort=-updatedAt`
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
