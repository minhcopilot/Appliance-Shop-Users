import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

import React from "react";

type Props = {
  params: {
    url: string;
  };
};

// export const generateStaticParams = async () => {
//   const categories = await getSubject("article/categories/");
//   const paths = categories.map((category: any) => ({
//     slug: { url: category.url },
//   }));
//   return paths;
// };

export default async function Blog({ params: { url } }: Props) {
  const postList = await getSubject(`article/posts/?category=${url}`);
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
