"use client";
import { Popover } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { SidebarList, postResponseSchema } from "./SidebarList";
import usePostSearch from "@/hooks/blog/useSearch";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

type Props = {};

export default function ArticleSearchBar({}: Props) {
  const Router = useRouter();
  const [query, setQuery] = React.useState("");
  const searchResult = usePostSearch(query);
  const debounceSetQuery = debounce((value: string) => setQuery(value), 1000);
  return (
    <Popover
      placement="bottom"
      trigger="focus"
      content={
        searchResult.isSuccess && <SidebarList postList={searchResult.data} />
      }
      open={searchResult.isSuccess && searchResult.data.docs.length > 0}
      overlayStyle={{ width: 450 }}
      arrow={false}
    >
      <Search
        enterButton="Tìm"
        placeholder="Tìm kiếm bài viết"
        onChange={(e) => {
          debounceSetQuery(e.target.value);
        }}
        onSearch={() => Router.push(`/blog/search/${query}`)}
        size="large"
      />
    </Popover>
  );
}
