import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../cart/AddToCart";

type Props = {
  data: any;
};

export default function ProductCard({ data }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-[400px] h-[380px] w-full relative">
      <div className="relative">
        <Link href={`/products/${data.id}`}>
          <Image
            src={data?.imageUrls[0]?.url}
            alt={data.name}
            width={400}
            height={300}
            className="object-cover w-full h-64 transition-transform duration-300 cursor-pointer hover:scale-105"
          />
        </Link>
        <AddToCart
          compact
          className="absolute flex items-center justify-center p-3 font-bold text-white transition-colors duration-300 bg-yellow-500 rounded-full bottom-2 right-2 hover:bg-yellow-600 "
          product={data}
          quantity={1}
        />
        {data.discount > 0 && (
          <span className="absolute top-0 right-0 px-2 py-1 text-white bg-red-500 rounded-md">
            {data.discount}%
          </span>
        )}
      </div>
      <Link href={`/products/${data.id}`}>
        <div className="p-4 ">
          <h3 className="text-lg text font-semibold mb-2 min-h-[3.5rem] line-clamp-2 hover:text-yellow-500 cursor-pointer">
            {data.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-600">
              {Math.round(
                (data.price * (100 - data.discount)) / 100
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                useGrouping: true,
              })}
            </p>
            <del className="text-gray-400">
              {data.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                useGrouping: true,
              })}
            </del>
          </div>
        </div>
      </Link>
    </div>
  );
}
