import Image from "next/image";
import React from "react";

interface propsTypes {
  img: string;
}
const Slide: React.FC<propsTypes> = ({ img }) => {
  return (
    <div className="outline-none border-none relative">
      <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] -translate-y-[50%] space-y-2 lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none"></div>
      <Image
        className="w-full h-[300px] md:h-auto rounded-xl object-cover object-right md:object-left-bottom"
        src={img}
        width={2000}
        height={2000}
        alt="slide-image"
      />
    </div>
  );
};

export default Slide;
