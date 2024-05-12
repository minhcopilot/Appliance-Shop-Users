import React from "react";
import { axiosClient } from "@/lib/axiosClient";
import AddToCartButton from "@/components/cart/AddToCart";
export const revalidate = false; // false | 0 | number (seconds)

export async function generateStaticParams() {
  const response = await axiosClient.get("/products");
  return response.data.map((product: any) => ({
    id: product.id?.toString(),
  }));
}

async function getProducts({ id }: { id: string }) {
  const response = await axiosClient.get(`/products/${id}`);

  return response.data;
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Product({ params }: Props) {
  const { id } = params;
  const product = await getProducts({ id });
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative">
          <img
            className="w-full  object-cover"
            src={product?.imageUrls[0]?.url}
            alt={product.name}
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-bl">
            {product?.discount}% OFF
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product?.name}
          </h3>
          <div className="flex items-center">
            <span className="text-gray-600 text-xl font-semibold">
              ${product?.price}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500 text-sm">
              {product?.description}
            </span>
          </div>
          <div className="mt-4">
            <AddToCartButton
              product={product}
              className="text-white bg-red-500 px-4 py-2 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
