import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cloudinaryUrl = "https://res.cloudinary.com/dtvekokcw/image/upload/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cropArticleCard = (imgUrl: string) => {
  return imgUrl
    .replace(cloudinaryUrl, cloudinaryUrl + "c_fill,h_200,w_400/")
    .replace(".jpg", ".webp");
};

export const cropArticlePost = (imgUrl: string) => {
  return imgUrl
    .replace(cloudinaryUrl, cloudinaryUrl + "c_fill,h_400,w_800/")
    .replace(".jpg", ".webp");
};
