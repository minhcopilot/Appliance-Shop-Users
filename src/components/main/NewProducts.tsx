import React from "react";

import { Metadata } from "next";
import ProductCard from "@/components/products/ProductCard";
import { axiosClient, axiosServerNext } from "@/lib/axiosClient";
export const revalidate = false; // false | 0 | number (seconds)

async function getProducts() {
  const response = await axiosClient.get("/products");
  const data = response.data;
  return data;
}

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

const NewProducts = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4 text-center">
          HOT SALE MỖI NGÀY
        </h2>
        <div
          className="grid grid-cols-1 place-items-center sm:place-items-start
        sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10
        xl:gap-x-20 xl:gap-y-10
        "
        >
          {products.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewProducts;
