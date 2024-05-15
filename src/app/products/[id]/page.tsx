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
    <div className="container mx-auto flex">
      <div className="w-1/2 pr-8">
        <div className="relative mb-4">
          <img
            className="w-full h-64 object-cover"
            src={product?.imageUrls[0]?.url}
            alt={product.name}
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-bl">
            {product?.discount}% OFF
          </span>
        </div>
        <div className="flex">
          {product?.imageUrls.slice(1, 4).map((image: any, index: number) => (
            <img
              key={index}
              className="w-1/3 h-20 object-cover mr-2"
              src={image.url}
              alt={product.name}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 pl-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product?.name}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-600 text-xl font-semibold">
                ${product?.price}
              </span>
              <div className="ml-4 flex items-center">
                <button
                  // onClick={() => setQuantity(quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-2"></span>
                <button
                  // onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">{product?.description}</p>
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
    </div>
  );
}
