import ProductSlides from "@/components/ui/ProductSlide";
import axiosClient from "@/config/axiosClient";
import React from "react";
async function getProducts() {
  const response = await axiosClient.get("/products");
  const data = response.data;
  return data;
}
export default async function SectionSalesProduct() {
  const products: any = await getProducts();
  return (
    <div>
      <ProductSlides
        title="HOT SALE MỖI NGÀY"
        description="Sản phẩm với giá cực kỳ hấp dẫn"
        products={products}
      />
    </div>
  );
}
