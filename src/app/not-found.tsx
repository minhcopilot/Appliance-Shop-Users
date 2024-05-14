import { Button, Result, Space } from "antd";
import Link from "next/link";

export default function Error() {
  return (
    <Result
      status={404}
      title="404"
      subTitle="Không tìm thấy trang bạn muốn truy cập"
      extra={
        <Link href="/">
          <Button type="primary">Quay lại trang chủ</Button>
        </Link>
      }
    />
  );
}
