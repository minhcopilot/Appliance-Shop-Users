"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  totalDocs: number;
  limit: number;
  page: number;
};

export default function ArticlePagination({ totalDocs, limit, page }: Props) {
  const Router = useRouter();
  return (
    <Pagination
      total={totalDocs}
      defaultCurrent={page}
      pageSize={limit}
      onChange={(page) => {
        Router.push("/blog/?page=" + page);
      }}
    />
  );
}
