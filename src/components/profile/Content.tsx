import CustomerOrders from "@/components/profile/CustomerOrders";
import VoucherList from "@/components/profile/CustomerVoucher";
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
      return (
        <div>
          <CustomerOrders />
        </div>
      );
    case "voucher":
      return (
        <div>
          <VoucherList />
        </div>
      );
    default:
      return <div>Nội dung mặc định</div>;
  }
}
