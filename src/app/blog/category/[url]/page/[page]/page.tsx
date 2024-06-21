import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
  params: {
    page: number;
    url: string;
  };
};

export const generateStaticParams = async () => {
  const categories = await getSubject("article/categories");
  let paths: any[] = [];
  categories.forEach(async (category: any) => {
    let post = await getSubject(`article/posts/?category=${category.url}`);
    let totalPages = post.totalPages;
    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        url: category,
        page: i.toString(),
      });
    }
  });
  return paths;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { url, page } = params;
  const category = await getSubject("article/categories", url);

  return {
    title: category.title + " - Trang " + page,
    description: category.description + " - Trang " + page,
  };
}

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
