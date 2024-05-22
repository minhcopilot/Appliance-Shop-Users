import ProductSlides from "@/components/ui/ProductSlide";
import { axiosClient } from "@/lib/axiosClient";
import React from "react";

async function getProductsByCate() {
  const response = await axiosClient.get("/products/category/18");
  const data = response.data;
  return data;
}
export default async function SectionMotherBaby() {
  const products: any = await getProductsByCate();
  return (
    <div>
      <ProductSlides title="Nhóm Mẹ & Bé" products={products} />
    </div>
  );
}
