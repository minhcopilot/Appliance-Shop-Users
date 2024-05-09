import React from "react";

import { Metadata } from "next";
import ProductCard from "@/components/products/ProductCard";
import { axiosClient } from "@/lib/axiosClient";
import Image from "next/image";
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

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
