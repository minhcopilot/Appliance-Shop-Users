import PasswordInput from "@/components/profile/PasswordInput";

interface ContentProps {
  section: string;
}

export default function ContentMe({ section }: ContentProps) {
  switch (section) {
    case "password":
      return (
        <div>
          <PasswordInput />
        </div>
      );
    case "order":
      return <div>Order</div>;
    case "voucher":
      return <div>voucher</div>;
    default:
      return <div>Nội dung mặc định</div>;
  }
}
