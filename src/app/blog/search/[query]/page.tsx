import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import { Content } from "antd/es/layout/layout";

type Props = {
  params: {
    query: string;
  };
};

export default async function BlogSearch({ params }: Props) {
  const { query } = params;
  const postList = await getSubject(
    "article/posts/?type=post&page=1&limit=10&sort=-updatedAt&search=" + query
  );
  return (
    <Content style={{ margin: "0 50px" }}>
      <ArticleList postList={postList} />
    </Content>
  );
}
