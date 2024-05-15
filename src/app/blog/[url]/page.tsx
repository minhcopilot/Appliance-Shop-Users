import ArticlePost from "@/components/article/ArticlePost";
import CommentSection from "@/components/article/CommentSection";
import PostAuthor from "@/components/article/PostAuthor";
import { getSubject } from "@/hooks/blog/useGet";
import { Flex } from "antd";
import React from "react";

type Props = {
  params: {
    url: string;
  };
};

export default async function BlogPost({ params }: Props) {
  const { url } = params;
  const postContent = await getSubject("article/posts", url);
  !postContent && (window.location.href = "/404");
  return (
    <Flex gap={30} vertical align="center">
      <ArticlePost post={postContent} />
      <PostAuthor
        authorName={postContent.authorName}
        authorId={postContent.authorId || undefined}
      />
      <CommentSection
        url={url}
        enableComment={postContent.commentStatus === "open"}
      />
    </Flex>
  );
}
