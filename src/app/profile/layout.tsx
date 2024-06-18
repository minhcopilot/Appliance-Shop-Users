import Sidebar from "@/components/profile/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="md:flex">
        <div className="md:w-1/4 lg:w-1/6">
          <Sidebar />
        </div>

        <main className="flex-1 p-0 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
