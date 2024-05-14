interface ContentProps {
  section: string;
}

export default function ContentMe({ section }: ContentProps) {
  switch (section) {
    case "settings":
      return <div>Nội dung cài đặt</div>;
    case "addresses":
      return <div>Nội dung địa chỉ</div>;
    default:
      return <div>Nội dung mặc định</div>;
  }
}
