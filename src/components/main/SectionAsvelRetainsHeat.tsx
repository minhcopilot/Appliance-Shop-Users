import ProductSlides from "@/components/ui/ProductSlide";
import { axiosClient } from "@/lib/axiosClient";
import React from "react";

async function getProductsByCate() {
  const response = await axiosClient.get("/products/category/29");
  const data = response.data;
  return data;
}
export default async function SectionAsvelRetainsHeat() {
  const products: any = await getProductsByCate();
  return (
    <div>
      <ProductSlides
        title="Nhóm nồi cơm"
        description="Nồi cơm cho gia đình."
        products={products}
      />
    </div>
  );
}
