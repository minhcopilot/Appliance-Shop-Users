import React from "react";
import FoodBox from "@/components/main/FoodBox";
import { axiosClient } from "@/lib/axiosClient";

async function getCategories() {
  const response = await axiosClient.get("/categories");
  const data = response.data;
  return data;
}

export default async function FoodGroup() {
  const categories = await getCategories();
  const topFourCategories = categories.slice(0, 4);
  return (
    <div className="flex flex-col space-y-4 mt-14">
      <div className="grid grid-cols-4 gap-4">
        {topFourCategories.map((category: any) => (
          <FoodBox
            key={category.id}
            imageUrl={category.CoverImageUrl}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}
