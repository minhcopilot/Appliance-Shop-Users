import ContentMe from "@/components/profile/Content";

interface SectionLayoutProps {
  children: React.ReactNode;
  params: { section: string };
}

export default function SectionLayout({
  children,
  params,
}: SectionLayoutProps) {
  return (
    <div>
      <ContentMe section={params.section} />
      {children}
    </div>
  );
}
