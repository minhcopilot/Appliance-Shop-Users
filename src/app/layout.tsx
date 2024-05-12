import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import HeaderTop from "@/components/header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Chat } from "@/components/chat/chat";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AntdProvider from "@/providers/AntdProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Gia dụng Đà Nẵng",
  description: "Đồ gia dụng Đà Nẵng siêu rẻ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken?.value}>
            <AntdProvider>
              <ReactQueryProvider>
                <AntdRegistry>
                  <Chat />
                  <HeaderTop />
                  <div className="mt-44">{children}</div>
                  <Toaster />
                </AntdRegistry>
              </ReactQueryProvider>
            </AntdProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
