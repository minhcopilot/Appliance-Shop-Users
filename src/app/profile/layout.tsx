import Sidebar from "@/components/profile/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
