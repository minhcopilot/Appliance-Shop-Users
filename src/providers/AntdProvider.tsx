import { ConfigProvider } from "antd";
import React from "react";

import viVN from "antd/lib/locale/vi_VN";

type Props = {};

export default function AntdProvider({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        components: {
          Layout: {
            bodyBg: "hsl(var(--background))",
            siderBg: "hsl(var(--background))",
            triggerBg: "hsl(var(--card))",
            triggerColor: "hsl(var(--foreground))",
          },
          Table: {
            headerBg: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            rowSelectedBg: "hsl(var(--card))",
            rowHoverBg: "hsl(var(--card-hover))",
            rowSelectedHoverBg: "hsl(var(--card-hover))",
          },
          Card: {
            actionsBg: "hsl(var(--card))",
            extraColor: "hsl(var(--card-foreground))",
            headerBg: "hsl(var(--card))",
          },
          Button: {
            defaultShadow: "0 2px 0 hsl(var(--background))",
            primaryShadow: "0 2px 0 hsl(var(--background))",
            dangerShadow: "0 2px 0 hsl(var(--background))",
          },
          Menu: {
            itemBg: "hsl(var(--card))",
          },
        },
        token: {
          colorBgContainer: "hsl(var(--background))",
          colorBorderBg: "hsl(var(--border))",
          colorBgElevated: "hsl(var(--popover))",
          controlItemBgActive: "hsl(var(--card))",
          controlItemBgHover: "hsl(var(--card-hover))",
          colorText: "hsl(var(--foreground))",
          colorTextBase: "hsl(var(--foreground))",
          colorTextLabel: "hsl(var(--accent-foreground))",
          colorTextHeading: "hsl(var(--foreground))",
          colorTextDescription: "hsl(var(--muted-foreground))",
          colorTextDisabled: "hsl(var(--muted-foreground))",
          colorTextPlaceholder: "hsl(var(--muted-foreground))",
          colorBorder: "hsl(var(--border))",
          colorBorderSecondary: "hsl(var(--border))",
          colorSplit: "hsl(var(--muted))",
          colorFillAlter: "hsl(var(--accent))",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
