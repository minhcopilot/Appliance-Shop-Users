import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
  params: {
    url: string;
  };
};

export const generateStaticParams = async () => {
  const categories = await getSubject("article/categories");
  const paths = categories.map((category: any) => ({
    url: category.url,
  }));
  return paths;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { url } = params;
  const category = await getSubject("article/categories", url);

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function Blog({ params: { url } }: Props) {
  const postList = await getSubject(`article/posts/?category=${url}`);
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
