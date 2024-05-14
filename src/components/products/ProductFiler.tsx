import React from 'react';

type Category = {
  id: number;
  name: string;
};

type CategoryFilterProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number | null) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategoryId, onCategorySelect }) => {
  return (
    <div className="dropdown">
      <button className="dropdown-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
        Loại sản phẩm
      </button>
      <div className="dropdown-content bg-white border border-gray-300 rounded-md mt-1 p-2">
        <a
          href="#"
          onClick={() => onCategorySelect(null)}
          className={`block py-1 hover:bg-gray-100 text-dark ${selectedCategoryId === null ? 'font-bold' : ''}`}
          style={{ color: 'black' }}
        >
          Tất cả
        </a>
        {categories.map((category) => (
          <a
            key={category.id}
            href="#"
            onClick={() => onCategorySelect(category.id)}
            className={`block py-1 hover:bg-gray-100 text-dark ${selectedCategoryId === category.id ? 'font-bold' : ''}`}
            style={{ color: 'black' }}
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
