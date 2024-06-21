import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export const generateStaticParams = async () => {
  const authors = await getSubject("article/posts/authorIds");
  const paths = authors.map((author: any) => ({
    id: author.toString(),
  }));
  return paths;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const postList = await getSubject(`article/posts/?authorId=${id}`);

  return {
    title: "Bài viết của tác giả " + postList.docs[0].authorName,
    description: "Bài viết của tác giả " + postList.docs[0].authorName,
  };
}

export default async function Blog({ params: { id } }: Props) {
  const postList = await getSubject(`article/posts/?authorId=${id}`);
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
