import { getSubject } from "@/hooks/blog/useGet";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";
import { postSchema } from "./ArticleCard";

type Props = {
  postContent: postSchema;
};

const getBreadcumb = async (breadcumb: any[], id?: string) => {
  if (!id) return breadcumb;
  const parent = await getSubject("article/categories", id);
  breadcumb.unshift({
    title: <Link href={"/blog/category/" + parent.url}>{parent.title}</Link>,
  });
  await getBreadcumb(breadcumb, parent.parentId);
  return breadcumb;
};

export default async function Breadcumb({ postContent }: Props) {
  const breadcumb = await getBreadcumb([], postContent.postCategoryId);
  return (
    <Breadcrumb
      className="self-start"
      style={{ marginBottom: 20 }}
      items={breadcumb}
    />
  );
}
