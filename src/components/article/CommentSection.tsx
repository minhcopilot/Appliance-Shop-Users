import { getSubject } from "@/hooks/blog/useGet";
import { Card, Flex } from "antd";
import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

type Props = {
  url: string;
  enableComment: boolean;
};

export default async function CommentSection({ url, enableComment }: Props) {
  const commentList = await getSubject("article/posts/" + url + "/comments");
  return (
    <Card style={{ margin: "0 50px", minWidth: "80%" }}>
      <Flex vertical gap={10}>
        {enableComment ? (
          <CommentForm url={url} />
        ) : (
          <Card size="small">Bình luận bị đóng</Card>
        )}
        {commentList.map((comment: any) => (
          <Comment comment={comment} />
        ))}
      </Flex>
    </Card>
  );
}
