"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/ProductFiler";
import SearchProduct from "@/components/products/SearchProduct";
import { axiosClient } from "@/lib/axiosClient";
import ReactPaginate from "react-paginate";
import "@/components/products/ProductPage.css";
import { Menu } from "lucide-react";

type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  createdAt: string;
};

type Category = {
  id: number;
  name: string;
};

type SortOption = "newest" | "highestPrice" | "lowestPrice";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosClient.get("/products");
      setProducts(response.data);
    };

    const fetchCategories = async () => {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const filteredAndSortedProducts = products
    .filter((product) => {
      return (
        (selectedCategoryId === null ||
          product.categoryId === selectedCategoryId) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "highestPrice":
          return b.price - a.price;
        case "lowestPrice":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredAndSortedProducts.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className="container mx-auto py-4 px-4 lg:px-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4">Tất cả sản phẩm</h1>

      <div className="lg:hidden mb-4">
        <button
          onClick={toggleMobileFilters}
          className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <Menu className="mr-2" size={20} />
          Lọc sản phẩm
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div
          className={`lg:w-1/4 lg:pr-4 ${
            isMobileFiltersOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="mb-6">
            <SearchProduct onSearch={handleSearch} />
            <div className="dropdown mb-6">
              <button className="dropdown-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full text-left">
                Sắp xếp theo
              </button>
              <div className="dropdown-content bg-white border border-gray-300 rounded-md mt-1 p-2">
                <button
                  onClick={() => handleSortChange("newest")}
                  className="block w-full text-left py-1 hover:bg-gray-100 text-dark"
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => handleSortChange("highestPrice")}
                  className="block w-full text-left py-1 hover:bg-gray-100 text-dark"
                >
                  Giá cao nhất
                </button>
                <button
                  onClick={() => handleSortChange("lowestPrice")}
                  className="block w-full text-left py-1 hover:bg-gray-100 text-dark"
                >
                  Giá thấp nhất
                </button>
              </div>
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={setSelectedCategoryId}
            />
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="pagination-container mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center"}
          activeClassName={"active"}
          previousClassName={"pagination-previous"}
          nextClassName={"pagination-next"}
          disabledClassName={"pagination-disabled"}
          pageClassName={"pagination-page"}
          pageLinkClassName={"pagination-link"}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
