import ArticlePost from "@/components/article/ArticlePost";
import ArticleSearchBar from "@/components/article/ArticleSearchBar";
import Breadcumb from "@/components/article/Breadcumb";
import CommentSection from "@/components/article/CommentSection";
import PostAuthor from "@/components/article/PostAuthor";
import { SidebarList } from "@/components/article/SidebarList";
import { getSubject } from "@/hooks/blog/useGet";
import { Flex, Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";

type Props = {
  params: {
    url: string;
  };
};

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
    <Content className="mx-[10%] min-w-[80%]">
      <Breadcumb postContent={postContent} />
      <Layout hasSider>
        <Content>
          <Flex vertical gap={20} align="center">
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
        </Content>
        <Sider
          width={400}
          breakpoint="xl"
          collapsible
          collapsedWidth={0}
          className="ml-5"
        >
          <Flex vertical gap={20}>
            <SidebarList postList={newest} title="Bài viết mới nhất" />
            <ArticleSearchBar />
            <SidebarList postList={mostLiked} title="Bài viết được yêu thích" />
            <SidebarList
              postList={mostViewed}
              title="Bài viết được xem nhiều"
            />
          </Flex>
        </Sider>
      </Layout>
    </Content>
  );
}
