import React, { useState } from "react";

type SearchProductProps = {
  onSearch: (term: string) => void;
};

const SearchProduct: React.FC<SearchProductProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar flex mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Tìm sản phẩm"
        className="
    border border-gray-300 rounded-l-md 
    px-2 py-1   sm:px-3 sm:py-2   md:px-4 md:py-2 
    focus:outline-none focus:ring focus:border-blue-300
    lg:w-full sm:w-1/2 md:w-full
  "
      />

      <button
        type="button"
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-r-md px-4 py-2 ml-1 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Tìm
      </button>
    </div>
  );
};

export default SearchProduct;
