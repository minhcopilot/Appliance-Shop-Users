"use client";
import { getSubject } from "@/hooks/blog/useGet";
import { Card, Flex, List, Skeleton } from "antd";
import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import useGetComments from "@/hooks/blog/useGetComment";

type Props = {
  url: string;
  enableComment: boolean;
};

export default function CommentSection({ url, enableComment }: Props) {
  const commentList = useGetComments(url);
  return (
    <Card className="w-full">
      <Flex vertical gap={10}>
        {enableComment ? (
          <CommentForm url={url} />
        ) : (
          <Card size="small">Bình luận bị đóng</Card>
        )}
        <List
          pagination={
            commentList.data?.length > 0
              ? { simple: true, pageSize: 10 }
              : false
          }
          dataSource={commentList.data}
          loading={commentList.isLoading}
          renderItem={(item: any) => (
            <Skeleton loading={commentList.isLoading} active avatar>
              <Comment comment={item} />
            </Skeleton>
          )}
        />
      </Flex>
    </Card>
  );
}
