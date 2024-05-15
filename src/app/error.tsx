"use client";
import { Button, Result, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Result
      status="500"
      title="500"
      subTitle={error.message}
      extra={
        <Space>
          <Button type="primary" onClick={() => router.push("/")}>
            Trang chủ
          </Button>
          <Button onClick={() => router.back()}>Quay lại</Button>
        </Space>
      }
    />
  );
}
