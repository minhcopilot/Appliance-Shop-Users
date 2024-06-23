"use client";
import * as React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
import { Menu } from "antd";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ toggle }: { toggle: () => void }) => {
  const [blogMenuItem, setBlogMenuItem] = React.useState<any[]>([]);
  let host = process.env.NEXT_PUBLIC_baseURL;
  React.useEffect(() => {
    fetch(host + "/article/categories")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((category: any) => {
          return {
            key: category.id,
            parentId: category.parentId,
            label: (
              <Link
                onClick={toggle}
                href={`/blog/category/${category.url}`}
                className="relative navbar__link text-foreground"
              >
                {category.title}
              </Link>
            ),
          };
        });
        const idMapping = mappedData.reduce((acc: any, el: any, i: any) => {
          acc[el.key] = i;
          return acc;
        }, {});
        let root: any[] = [];
        mappedData.forEach((el: any) => {
          // Handle the root element
          if (!el.parentId) {
            root = [...root, el];
            return;
          }
          // Use our mapping to locate the parent element in our data array
          const parentEl = mappedData[idMapping[el.parentId]];
          // Add our current el to its parent's `children` array
          parentEl && (parentEl.children = [...(parentEl.children || []), el]);
        });
        setBlogMenuItem(root);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const items = [
    {
      key: "/",
      label: (
        <Link href="/" className="text-foreground">
          TRANG CHỦ
        </Link>
      ),
    },
    {
      key: "/products",
      label: (
        <Link href="/products" className="text-foreground" onClick={toggle}>
          SẢN PHẨM
        </Link>
      ),
    },
    {
      key: "/blog",
      label: (
        <Link href="/blog" className="text-foreground" onClick={toggle}>
          BLOG
        </Link>
      ),
      children: blogMenuItem,
    },
    {
      key: "/contact",
      label: (
        <Link href="/contact" className="text-foreground" onClick={toggle}>
          LIÊN HỆ
        </Link>
      ),
    },
    {
      key: "/check-order",
      label: (
        <Link href="/check-order" className="text-foreground" onClick={toggle}>
          KIỂM TRA ĐƠN HÀNG
        </Link>
      ),
    },
  ];
  return (
    <motion.ul variants={variants} className={styles.motionUl}>
      <MenuItem>
        <Menu items={items} mode="inline" />
      </MenuItem>
    </motion.ul>
  );
};
