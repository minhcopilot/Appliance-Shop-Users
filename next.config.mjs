/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Thêm các mẫu khác nếu cần
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
};

export default nextConfig;
