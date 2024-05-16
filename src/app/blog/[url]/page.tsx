import ArticlePost from "@/components/article/ArticlePost";
import Breadcumb from "@/components/article/Breadcumb";
import CommentSection from "@/components/article/CommentSection";
import PostAuthor from "@/components/article/PostAuthor";
import { getSubject } from "@/hooks/blog/useGet";
import { Flex } from "antd";

type Props = {
  params: {
    url: string;
  };
};

export default async function BlogPost({ params }: Props) {
  const { url } = params;
  const postContent = await getSubject("article/posts", url);
  return (
    <Flex gap={30} vertical align="center" className="mx-[10%] min-w-[80%]">
      <Breadcumb postContent={postContent} />
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
