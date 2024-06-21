import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
  params: {
    page: number;
    id: number;
  };
};

export const generateStaticParams = async () => {
  const authors = await getSubject("article/posts/authorIds");
  let paths: any[] = [];
  authors.forEach(async (author: any) => {
    let post = await getSubject(`article/posts/?authorId=${author}`);
    let totalPages = post.totalPages;
    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        id: author.toString(),
        page: i.toString(),
      });
    }
  });
  console.log(paths);
  return paths;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, page } = params;
  const postList = await getSubject(`article/posts/?authorId=${id}`);

  return {
    title:
      "Bài viết của tác giả " +
      postList.docs[0].authorName +
      " - Trang " +
      page,
    description:
      "Bài viết của tác giả " +
      postList.docs[0].authorName +
      " - Trang " +
      page,
  };
}

export default async function Blog({ params: { page, id } }: Props) {
  const postList = await getSubject(
    `article/posts/?authorId=${id}&page=${page}&limit=10`
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
