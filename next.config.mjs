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
  },
};

export default nextConfig;
