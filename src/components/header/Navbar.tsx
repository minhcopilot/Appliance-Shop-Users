import { axiosClient } from "@/lib/axiosClient";
import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  className?: string;
}

const getCategoryMenu = async () => {
  try {
    const categories = await axiosClient.get("/article/categories");
    const data = categories.data.map((category: any) => {
      return {
        key: category.id,
        parentId: category.parentId,
        label: (
          <Link
            href={`/blog/category/${category.url}`}
            className="relative navbar__link text-foreground"
          >
            {category.title}
          </Link>
        ),
      };
    });
    const idMapping = data.reduce((acc: any, el: any, i: any) => {
      acc[el.key] = i;
      return acc;
    }, {});
    let root: any[] = [];
    data.forEach((el: any) => {
      // Handle the root element
      if (!el.parentId) {
        root = [...root, el];
        return;
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = data[idMapping[el.parentId]];
      // Add our current el to its parent's `children` array
      parentEl && (parentEl.children = [...(parentEl.children || []), el]);
    });
    return root;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Navbar({ className }: NavbarProps) {
  const blogMenuItem = await getCategoryMenu();
  const menuItem: ItemType[] = [
    {
      key: "/",
      label: (
        <Link href="/" className="relative navbar__link text-foreground">
          TRANG CHỦ
        </Link>
      ),
    },
    {
      key: "/products",
      label: (
        <Link
          href="/products"
          className="relative navbar__link text-foreground"
        >
          SẢN PHẨM
        </Link>
      ),
    },
    {
      key: "/blog",
      label: (
        <Link href="/blog" className="relative navbar__link text-foreground">
          BLOG
        </Link>
      ),
      children: blogMenuItem,
    },
    {
      key: "/contact",
      label: (
        <Link href="/contact" className="relative navbar__link text-foreground">
          LIÊN HỆ
        </Link>
      ),
    },
    {
      key: "/check-order",
      label: (
        <Link
          href="/check-order"
          className="relative navbar__link text-foreground"
        >
          KIỂM TRA ĐƠN HÀNG
        </Link>
      ),
    },
  ];

  return (
    <div className={`hidden lg:block ${className || ""}`}>
      <div className="container flex justify-center">
        <Menu
          selectable={false}
          className="flex py-4 mx-auto font-bold w-fit text-blackish"
          style={{
            minWidth: 0,
            flex: "auto",
            justifyContent: "center",
            fontSize: "1rem",
          }}
          mode="horizontal"
          items={menuItem}
        />
      </div>
    </div>
  );
}
