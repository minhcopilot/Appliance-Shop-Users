import React from "react";
import Image from "next/image";

interface ReviewProps {
  reviews: {
    name: string;
    rating: number;
    comment: string;
    avatar: string; // Add the avatar property
  }[];
}

const ReviewInterface: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <div className="p-6 pb-10 text-center bg-gray-100 rounded-lg">
      <h2 className="mb-4 text-2xl font-bold ">Đánh giá của khách hàng</h2>
      <div className="grid grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <p className="font-semibold text-gray-800">{review.comment}</p>
            <div className="flex items-center justify-center mt-2">
              <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-full">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-gray-600">{review.name}</p>
            </div>
            <div className="flex items-center justify-center mt-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewInterface;
