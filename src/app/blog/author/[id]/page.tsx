import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    id: number;
  };
};

// export const generateStaticParams = async () => {
//   const authors = await getSubject("article/posts/authorIds");
//   const paths = authors.map((author: any) => ({
//     slug: { id: author },
//   }));
//   return paths;
// };

export default async function Blog({ params: { id } }: Props) {
  const postList = await getSubject(`article/posts/?authorId=${id}`);
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
