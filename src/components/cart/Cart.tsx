"use client";
import { useAppContext } from "@/app/AppProvider";
import { CartItem, useCart } from "@/hooks/useCart";
import {
  Button,
  Form,
  FormInstance,
  InputNumber,
  Popconfirm,
  Table,
} from "antd";
import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useOrder } from "@/hooks/useOrder";

interface getoption {
  id: number;
  name: string;
}
interface order {
  productId: number;
  product: getoption;
  quantity: number;
  price: number;
  discount: number;
}

type EditableRowProps = {
  index: number;
};

type EditableCellProps = {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof order;
  record: order;
  handleSave: (record: order) => void;
};
type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export default function Cart({
  limit,
  compact,
}: {
  limit?: number;
  compact?: boolean;
}) {
  const { sessionToken } = useAppContext();
  const {
    items,
    setItems,
    getItems,
    setCart,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart((state) => state);
  const { orderItems, setOrderItems } = useOrder((state) => state);

  useEffect(() => {
    sessionToken && getItems(sessionToken);
  }, [sessionToken]);

  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  const EditableRow = ({ index, ...props }: EditableRowProps) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }: EditableCellProps) => {
    const [editing, setEditing] = useState(false);
    const form = React.useContext(EditableContext)!;

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    const stock = items.find((item) => item.productId === record?.productId)
      ?.product.stock;

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} không được bỏ trống.`,
            },
            {
              type: "number",
              message: "Số lượng phải là số.",
            },
            {
              type: "number",
              min: 0,
              message: "Số lượng phải lớn hơn hoặc bằng 0.",
            },
            {
              type: "number",
              max: stock,
              message: "Số lượng phải nhỏ hơn hoặc bằng số lượng trong kho.",
            },
          ]}
        >
          <InputNumber
            style={{ width: 60 }}
            autoFocus
            // ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            min={0}
            max={stock}
          />
        </Form.Item>
      ) : (
        <div className={styles.editableCell} onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const productColumn: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex?: string;
  })[] = [
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 20,
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "product.coverImageUrl",
      key: "product.coverImageUrl",
      responsive: ["md"],
      render: (_: any, record: any) => {
        let coverImageUrl = record.product.coverImageUrl;
        return (
          <>
            {coverImageUrl && (
              <Image
                src={coverImageUrl}
                width={50}
                height={50}
                alt={record.product.name}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product.name",
      key: "product.name",
      render: (_: any, record: any) => {
        let name = record.product.name;
        return (
          <Link href={"/products/" + record.productId}>
            {compact
              ? name.substring(0, 40) + (name.length > 40 ? "..." : "")
              : record.product.name}
          </Link>
        );
      },
    },

    {
      title: "Giá cả",
      dataIndex: "product.price",
      key: "product.price",
      align: "right",
      render: (_: any, record: any) => {
        return (
          <>
            {record.product.price.toLocaleString("vi-VN", {
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
        return <>{record.product.discount}%</>;
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
              ((record.product.price * (100 - record.product.discount)) / 100) *
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 40,
      render: (_: any, record: any, index: number) => {
        return (
          <Popconfirm
            placement="topRight"
            title="Xoá sản phẩm này?"
            description="Bạn có chắc chắn muốn xoá sản phẩm này?"
            onConfirm={() => {
              removeItem(record.productId, sessionToken);
            }}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        );
      },
    },
  ];

  if (compact) {
    productColumn.splice(1, 1);
    productColumn.splice(2, 2);
  }

  const handleSave = (row: order) => {
    if (row.quantity <= 0) {
      removeItem(row.productId, sessionToken);
      setOrderItems(
        orderItems.filter((item) => item.productId !== row.productId)
      );
      return;
    }
    const newData = [...items];
    const index = newData.findIndex((item) => row.productId === item.productId);
    newData[index].quantity = row.quantity;
    setItems(newData, sessionToken);
    setOrderItems(
      orderItems.map((item) =>
        item.productId === row.productId
          ? { ...item, quantity: row.quantity }
          : item
      )
    );
  };

  const columns = productColumn.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: order) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: CartItem[]
  ) => {
    setOrderItems(selectedRows);
  };

  const rowSelection = {
    fixed: true,
    onChange: onSelectChange,
  };

  return (
    <>
      <Table
        components={components}
        rowClassName={styles.editableRow}
        rowKey="productId"
        rowSelection={compact ? undefined : rowSelection}
        columns={columns as any}
        dataSource={
          limit ? items.toSpliced(limit) : compact ? items.toSpliced(5) : items
        }
        showHeader={!compact}
        style={{ overflow: "hidden" }}
      />
    </>
  );
}