import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Chat } from "@/components/chat/chat";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AntdProvider from "@/providers/AntdProvider";
import Footer from "@/components/footer/Footer";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
// import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import Navbar from "@/components/header/Navbar";
import CallButton from "@/components/ui/CallButton";
import ChatProvider from "@/providers/ChatProvider";
import ChatBot from "@/components/chatbot/ChatBot";
import BackTop from "antd/es/float-button/BackTop";
import FacebookIcon from "@/components/ui/FacebookIcon";
import { ChatStoreProvider } from "@/providers/ChatStoreProvider";
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
  const userCookie = cookieStore.get("user");
  const user = userCookie
    ? JSON.parse(decodeURIComponent(userCookie.value))
    : null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider
            initialSessionToken={sessionToken?.value}
            initialUser={user}
          >
            <AntdProvider>
              <ReactQueryProvider>
                <AntdRegistry>
                  <ChatStoreProvider>
                    <ChatProvider>
                      <Chat />
                      <Header>
                        <Navbar />
                      </Header>
                      <div className="mt-36">{children}</div>
                      <Toaster />
                      <NewsletterSignup />
                      <Footer />
                      <FacebookIcon />
                      <CallButton />
                      <BackTop
                        style={{
                          bottom: 177,
                          zIndex: 50,
                        }}
                        className="floatButton"
                      />
                      <ChatBot />
                    </ChatProvider>
                  </ChatStoreProvider>
                </AntdRegistry>
              </ReactQueryProvider>
            </AntdProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
