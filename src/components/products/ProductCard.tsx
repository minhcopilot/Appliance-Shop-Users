import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import AddToCart from "../cart/AddToCart";
type Props = {
  data: any;
};

export default function ProductCard({ data }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-[400px] h-[380px] w-full">
      <div className="relative">
        <Image
          src={data?.imageUrls[0]?.url}
          alt={data.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        <AddToCart
          compact
          className="absolute bottom-2 right-2 bg-yellow-500 text-white font-bold p-3 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300"
          product={data}
        />
      </div>
      <Link href={`/products/${data.id}`}>
        <div className="p-4 ">
          <h3 className="text-lg text font-semibold mb-2 min-h-[3.5rem] line-clamp-2 hover:text-yellow-500 cursor-pointer">
            {data.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-medium">{data.price}đ</p>
            <del className="text-gray-400">{parseInt(data?.price) + 50}đ</del>
          </div>
        </div>
      </Link>
    </div>
  );
}
