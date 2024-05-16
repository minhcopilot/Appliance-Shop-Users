"use client";
import Slide from "@/components/header/Slide";
import React from "react";
import Slider from "react-slick";
export default function Hero() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slideData = [
    {
      id: 0,
      img: "/slider_1.webp",
    },
    {
      id: 1,
      img: "/slider_2.webp",
    },
    {
      id: 2,
      img: "/slider_3.webp",
    },
  ];
  return (
    <div>
      <div className=" pt-6 lg:pt-0">
        <Slider {...settings}>
          {slideData.map((slide) => (
            <Slide key={slide.id} img={slide.img} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
