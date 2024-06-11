"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosClient from "@/config/axiosClient";

interface OrderDetail {
  productId: number;
  quantity: number;
  price: string;
  discount: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    stock: number;
    description: string;
    imageUrls: string;
    coverImageUrl: string | null;
    categoryId: number;
    supplierId: number;
  };
}

interface Order {
  id: number;
  createdDate: string;
  shippedDate: string | null;
  status: string;
  shippingAddress: string;
  shippingCity: string;
  paymentType: string;
  orderDetails: OrderDetail[];
  voucherId?: number;
  voucherCode?: string;
  discountPercentage?: number;
}

interface OrderListCustomerProps {
  orders: Order[];
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: () => "ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "createdDate",
    header: () => "Ngày tạo",
    cell: ({ row }) => (
      <div>{new Date(row.original.createdDate).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Trạng thái",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: "shippingAddress",
    header: () => "Địa chỉ",
    cell: ({ row }) => (
      <div>{`${row.original.shippingAddress}, ${row.original.shippingCity}`}</div>
    ),
  },
  {
    accessorKey: "paymentType",
    header: () => "Thanh toán",
    cell: ({ row }) => <div>{row.original.paymentType}</div>,
  },
  {
    accessorKey: "voucherCode",
    header: () => "Mã giảm giá",
    cell: ({ row }) => <div>{row.original.voucherCode || ""}</div>,
  },
  {
    accessorKey: "totalValue",
    header: () => "Tổng thanh toán",
    cell: ({ row }) => (
      <div>{calculateTotalOrderValue(row.original).toFixed(0)} đ</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const calculateTotalOrderValue = (order: Order) => {
  const orderTotal = order.orderDetails.reduce((total, detail) => {
    const productPrice = parseFloat(detail.product.price.toString());
    const productDiscount = detail.discount;
    const discountedPrice =
      productPrice - (productPrice * productDiscount) / 100;
    const productTotal = discountedPrice * detail.quantity;
    return total + productTotal;
  }, 0);

  const discount = order.discountPercentage || 0;
  return orderTotal - (orderTotal * discount) / 100;
};

export function OrderListCustomer({ orders }: OrderListCustomerProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [orderData, setOrderData] = useState<Order[]>(
    orders.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
  );
  useEffect(() => {
    const fetchVoucherCodes = async () => {
      try {
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            if (order.voucherId) {
              const response = await axiosClient.get(
                `/vouchers/${order.voucherId}`
              );
              return {
                ...order,
                voucherCode: response.data.voucherCode,
                discountPercentage: response.data.discountPercentage,
              };
            }
            return order;
          })
        );
        setOrderData(
          updatedOrders.sort(
            (a, b) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          )
        );
      } catch (error) {
        console.error("Error fetching voucher codes:", error);
      }
    };

    fetchVoucherCodes();
  }, [orders]);

  const table = useReactTable({
    data: orderData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter orders..."
          value={
            (table.getColumn("shippingAddress")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("shippingAddress")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
