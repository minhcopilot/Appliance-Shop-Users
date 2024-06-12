import React from "react";
import { axiosClient } from "@/lib/axiosClient";
import ProductDetails from "@/components/products/ProductDetails";

export const revalidate = false;

export async function generateStaticParams() {
  const response = await axiosClient.get("/products");
  return response.data.map((product: any) => ({
    id: product.id?.toString(),
  }));
}

async function getProductData(id: number) {
  const productResponse = await axiosClient.get(`/products/${id}`);
  const productsResponse = await axiosClient.get("/products");
  return {
    product: productResponse.data,
    products: productsResponse.data,
  };
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { product, products } = await getProductData(Number(id));

  return (
    <ProductDetails product={product} relatedProducts={products.slice(0, 5)} />
  );
};

export default ProductPage;
