import ArticlePost from "@/components/article/ArticlePost";
import ArticleSearchBar from "@/components/article/ArticleSearchBar";
import Breadcumb from "@/components/article/Breadcumb";
import CommentSection from "@/components/article/CommentSection";
import PostAuthor from "@/components/article/PostAuthor";
import { SidebarList } from "@/components/article/SidebarList";
import { getSubject } from "@/hooks/blog/useGet";
import { Flex, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import "./page.css";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { url: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () => {
  const posts = await getSubject("article/posts/?type=post&pagination=false");
  const paths = posts.docs.map((post: any) => ({
    url: post.url,
  }));
  return paths;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { url } = params;
  const postContent = await getSubject("article/posts", url);

  return {
    title: postContent.title,
    description: postContent.content,
  };
}

export default async function BlogPost({ params }: Props) {
  const { url } = params;
  const postContent = await getSubject("article/posts", url);
  const mostViewed = await getSubject(
    "article/posts/?type=post&limit=3&sort=-view"
  );
  const mostLiked = await getSubject(
    "article/posts/?type=post&limit=3&sort=-like"
  );
  const newest = await getSubject(
    "article/posts/?type=post&limit=3&sort=-createdAt"
  );
  return (
    <Content className="mx-[10%]">
      <Breadcumb postContent={postContent} />
      <Flex gap={10} className="w-full" wrap>
        <Flex vertical gap={20} align="center" className="articleContent">
          <ArticlePost post={postContent} />
          {postContent.type === "post" && (
            <>
              <PostAuthor
                authorName={postContent.authorName}
                authorId={postContent.authorId || undefined}
              />
              <CommentSection
                url={url}
                enableComment={postContent.commentStatus === "open"}
              />
            </>
          )}
        </Flex>
        {postContent.type === "post" && (
          <Flex vertical gap={20} className="articleSide">
            <SidebarList postList={newest} title="Bài viết mới nhất" />
            <ArticleSearchBar />
            <SidebarList postList={mostLiked} title="Bài viết được yêu thích" />
            <SidebarList
              postList={mostViewed}
              title="Bài viết được xem nhiều"
            />
          </Flex>
        )}
      </Flex>
    </Content>
  );
}
