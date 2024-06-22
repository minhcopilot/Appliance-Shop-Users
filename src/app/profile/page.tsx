import ProfileForm from "@/app/profile/profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang cá nhân Gia dụng Haven",
  description: "Trang cá nhân Gia dụng Haven",
};
export default function ProfilePage() {
  return <ProfileForm />;
}
