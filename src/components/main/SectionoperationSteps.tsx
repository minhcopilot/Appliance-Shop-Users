import React from "react";
import Image from "next/image";

interface StepItemProps {
  icon: string;
  title: string;
  description: string;
  step: string;
}

const StepItem: React.FC<StepItemProps> = ({
  icon,
  title,
  description,
  step,
}) => (
  <div className="flex flex-col items-center space-x-4 text-center">
    <div className="flex-shrink-0 mb-3">
      <Image src={icon} alt={title} width={140} height={140} />
    </div>
    <div>
      <span className="px-3 py-1 text-white bg-yellow-400 rounded-full">
        Bước {step}
      </span>
      <h3 className="my-5 text-lg font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

const StepsComponent: React.FC = () => (
  <div className="flex justify-between my-12">
    <StepItem
      icon="/filter-icon.png"
      title="Lọc & Khám phá"
      description="Tính năng lọc thông minh và gợi ý giúp dễ dàng tìm kiếm"
      step="1"
    />
    <StepItem
      icon="/cart-icon.jpg"
      title="Thêm vào giỏ hàng"
      description="Dễ dàng chọn các sản phẩm chính xác và thêm vào giỏ hàng"
      step="2"
    />
    <StepItem
      icon="/shipping-icon.png"
      title="Giao hàng nhanh chóng"
      description="Đơn vị vận chuyển sẽ xác nhận và giao hàng nhanh chóng đến bạn"
      step="3"
    />
    <StepItem
      icon="/customer-rating.png"
      title="Trải nghiệm sản phẩm"
      description="Hãy tận hưởng và trải nghiệm sản phẩm chất lượng 5 sao"
      step="4"
    />
  </div>
);

export default StepsComponent;
