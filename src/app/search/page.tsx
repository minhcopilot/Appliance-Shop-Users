"use client";
import { axiosClient } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axiosClient.get(
          `/products/search?keyword=${searchTerm}`
        );
        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        toast({
          title: "Lỗi tìm kiếm",
          description: "Đã xảy ra lỗi tìm kiếm !",
        });
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <h2 className="pb-4 text-2xl font-medium text-center">Trang tìm kiếm</h2>
      {searchResults.length > 0 ? (
        <>
          <h2 className="pb-4 text-xl font-medium text-center">
            Kết quả tìm kiếm cho: {searchTerm}
          </h2>
          <div className="grid grid-cols-1 gap-10 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 xl:gap-x-20 xl:gap-y-10 ">
            {searchResults.map((product: any) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="pb-4 text-xl font-medium text-center">
            Kết quả tìm kiếm cho: {searchTerm}
          </h2>
          <p>Không tìm thấy bất kỳ kết quả nào với từ khóa trên.</p>
        </>
      )}
    </div>
  );
};

export default SearchPage;
