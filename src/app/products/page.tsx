"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/ProductFiler";
import SearchProduct from "@/components/products/SearchProduct";
import { axiosClient } from "@/lib/axiosClient";
import ReactPaginate from "react-paginate";
import "@/components/products/ProductPage.css"

// Định nghĩa kiểu dữ liệu cho Product và Category
type Product = {
  id: number;
  name: string;
  categoryId: number;
  // Các thuộc tính khác của sản phẩm
};

type Category = {
  id: number;
  name: string;
  // Các thuộc tính khác của danh mục
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 8; // Số lượng sản phẩm trên mỗi trang

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
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategoryId === null || product.categoryId === selectedCategoryId) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  return (
    <div className="container mx-auto py-8 px-4 flex flex-col">
      <div className="flex mb-8">
        <div className="w-1/4 mr-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-6">Sản phẩm</h1>
            <SearchProduct onSearch={handleSearch} /> {/* Sử dụng SearchProduct */}
            <div className="dropdown mb-6">
              <button className="dropdown-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                Sắp xếp theo
              </button>
              <div className="dropdown-content bg-white border border-gray-300 rounded-md mt-1 p-2">
                <a href="#" className="block py-1 hover:bg-gray-100 text-dark">Mới nhất</a>
                <a href="#" className="block py-1 hover:bg-gray-100 text-dark">Giá cao nhất</a>
                <a href="#" className="block py-1 hover:bg-gray-100 text-dark">Giá thấp nhất</a>
              </div>
            </div>

         

            <CategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={setSelectedCategoryId}
            />
          </div>
        </div>

        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>

      <div className="pagination-container mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
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
