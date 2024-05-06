import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Chat } from "@/components/chat/chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appliance Shop",
  description: "Appliance Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Layout>
            <Chat />
            <Header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="demo-logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content style={{ padding: "0 48px" }}>
              <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
              />
              <div
                style={{
                  padding: 24,
                  minHeight: 380,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
