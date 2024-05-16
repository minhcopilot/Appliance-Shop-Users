import React from "react";

const NewsletterSignup: React.FC = () => {
  return (
    <div className="bg-yellow-300 py-9 mt-16 ">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold ms-48">
          Đăng ký nhận tin khuyến mãi
        </h3>
        <div className="flex me-48 ">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="px-4 py-2 rounded-l-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="button"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
