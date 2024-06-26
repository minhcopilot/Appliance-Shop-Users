import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-white-800 pt-8"
      style={{ color: "hsl(var(--card-foreground)))" }}
    >
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-8">Thông tin liên hệ</h3>
          <p className="mb-2">Haven Miền Trung - Vận hành đơn hàng toàn quốc</p>
          <p className="mb-2">
            Địa chỉ : 92/26 Thi Sách, Hoà Thuận Nam, Hải Châu, Tp. Đà Nẵng
          </p>
          {/* <p className="mb-2">Mã số thuế: 0401679723</p> */}
          <p className="mb-2">Email: baovuphan@gmail.com</p>
          <p className="mb-2">Hotline: 0905 3636 82</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-8">Về chúng tôi</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-foreground hover:text-blue-400">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-foreground hover:text-blue-400"
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                href="/blog/category/tin-tuc"
                className="text-foreground hover:text-blue-400"
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground hover:text-blue-400"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-8">Chính sách</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-khach-hang"
                className="text-foreground hover:text-blue-400"
              >
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link
                href="/blog/dieu-khoan-dich-vu"
                className="text-foreground hover:text-blue-400"
              >
                Chính sách vận chuyển
              </Link>
            </li>
            <li>
              <Link
                href="/blog/dieu-khoan-dich-vu"
                className="text-foreground hover:text-blue-400"
              >
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link
                href="/blog/dieu-khoan-dich-vu"
                className="text-foreground hover:text-blue-400"
              >
                Quy định sử dụng
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-8">Fanpage</h3>
          <div className="flex items-center">
            <Link
              href="https://www.facebook.com/phanvubao1990"
              className="text-foreground hover:text-blue-400"
            >
              Facebook
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="https://www.facebook.com/phanvubao1990"
              className="text-foreground hover:text-blue-400"
            >
              Zalo: 0905.3636.82
            </Link>
          </div>
        </div>
      </div>
      <div className=" text-center text-white bg-gray-600 py-5 mt-8">
        <p>
          Bản quyền thuộc về{" "}
          <a className="uppercase font-bold text-yellow-500" href="#">
            Nhóm 2 batch-36
          </a>{" "}
          | Cung cấp bởi{" "}
          <a className="uppercase font-bold text-yellow-500" href="#">
            Dev Đà Nẵng
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
