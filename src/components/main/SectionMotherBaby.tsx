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
      <ProductSlides
        title="Nhóm Mẹ & Bé"
        description="Đồng hành cùng mẹ bầu và bé yêu với đầy đủ thiết bị, đồ dùng chất lượng cao."
        products={products}
      />
    </div>
  );
}
