"use client";
import { Table, message } from "antd";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderItem } from "@/hooks/useOrder";
import { useAppContext } from "@/app/AppProvider";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export default function OrderDetail({}) {
  const { items, getItems } = useCart((state) => state);
  const searchParams = useSearchParams();
  const orderItems = JSON.parse(
    searchParams.get("orderItems") || "[]"
  ) as OrderItem[];
  const token = useAppContext().sessionToken;
  const Router = useRouter();

  const orderDetailItems = orderItems.map((item) => {
    const product = items.find((x) => x.productId === item.productId);
    if (!product) {
      return {
        ...item,
        product: null,
      };
    }
    return {
      ...item,
      product: product?.product,
    };
  });
  useEffect(() => {
    getItems(token);
  }, []);
  const productColumn: (ColumnTypes[number] & {
    dataIndex?: string;
  })[] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product.name",
      key: "product.name",
      render: (_: any, record: any) => {
        let name = record.product?.name;
        return <Link href={"/products/" + record.productId}>{name}</Link>;
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "product.imageUrls[0]?.url",
      key: "product.imageUrls[0]?.url",
      responsive: ["md"],
      render: (_: any, record: any) => {
        let coverImageUrl = record.product?.imageUrls[0]?.url;
        return (
          <>
            {coverImageUrl && (
              <Link href={"/products/" + record.productId}>
                <Image
                  src={coverImageUrl}
                  width={50}
                  height={50}
                  alt={record.product?.name}
                />
              </Link>
            )}
          </>
        );
      },
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 20,
    },
    {
      title: "Giá cả",
      dataIndex: "product.price",
      key: "product.price",
      align: "right",
      render: (_: any, record: any) => {
        return (
          <>
            {record.product?.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </>
        );
      },
      responsive: ["lg"],
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "product.discount",
      align: "right",
      render: (_: any, record: any) => {
        return <>{record.product?.discount}%</>;
      },
      responsive: ["lg"],
    },
    {
      title: "Tổng tiền",
      key: "total",
      align: "right",
      render: (_: any, record: any) => {
        return (
          <>
            {(
              ((record.product?.price * (100 - record.product?.discount)) /
                100) *
              record.quantity
            ).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </>
        );
      },
      responsive: ["md"],
    },
  ];

  return (
    <Table
      rowKey="productId"
      columns={productColumn}
      dataSource={orderDetailItems}
      style={{ overflow: "hidden" }}
      pagination={{ position: ["bottomCenter"] }}
    />
  );
}
