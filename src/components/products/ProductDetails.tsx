"use client";

import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import AddToCartButton from "@/components/cart/AddToCart";
import { Star } from "lucide-react";

const ProductDetails = ({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: any) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <section className="py-5 mt-5">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-5">
            <aside className="lg:w-1/2 px-5">
              <div className="mb-3 flex justify-center">
                <div
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  data-type="image"
                >
                  <img
                    className="rounded-4"
                    style={{
                      maxWidth: "60%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    src={product?.imageUrls[0]?.url}
                    alt="Product"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-3">
                {product?.imageUrls
                  .slice(1, 4)
                  .map((image: any, index: any) => (
                    <div
                      key={index}
                      data-fslightbox="mygalley"
                      className="border mx-1 rounded-2"
                      data-type="image"
                    >
                      <img
                        key={index}
                        className="rounded-2 w-32 h-32 object-cover img-thumbnail"
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
              </div>
            </aside>
            <main className="lg:w-1/2 px-5">
              <div className="ps-lg-3">
                <h4 className="text-black text-4xl">{product.name}</h4>
                <div className="flex my-3">
                  <div className="flex items-center text-yellow-400">
                    4.5 <Star size={16} />
                  </div>
                  <div className="mx-4">
                    <span className="text-gray-400">5,000+ đã mua hàng</span>
                  </div>
                  <div className="text-green-400 ms-2">
                    {product.stock} sản phẩm có sẵn
                  </div>
                </div>

                <div className="mb-3">
                  <span className="font-medium text-yellow-400 text-lg me-8">
                    {Math.round(
                      (product.price * (100 - product.discount)) / 100
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      useGrouping: true,
                    })}
                  </span>
                  <del className="text-gray-400">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      useGrouping: true,
                    })}
                  </del>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-semibold">Xuất sứ:</dt>
                    <dd>Nhật bản</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Màu sắc</dt>
                    <dd>{product.color}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Vật liệu</dt>
                    <dd>Nhựa</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Loại sản phẩm</dt>
                    <dd>{product.category.name}</dd>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Kích thước</label>
                    <select className="form-select border border-secondary h-9 w-full">
                      <option>Nhỏ</option>
                      <option>Vừa</option>
                      <option>Lớn</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Số lượng</label>
                    <div className="input-group mb-3 flex items-center border border-secondary h-9 w-full">
                      <button
                        className="btn bg-white border-r border-secondary px-3"
                        type="button"
                        id="button-addon1"
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        <MinusOutlined />
                      </button>
                      <input
                        type="number"
                        className="form-control text-center border-none"
                        placeholder="1"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value))
                        }
                      />
                      <button
                        className="btn bg-white border-l border-secondary px-3"
                        type="button"
                        id="button-addon2"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <AddToCartButton
                    product={product}
                    className="text-white bg-red-500 px-4 py-2 rounded-md"
                    quantity={quantity}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-light border-t py-4 mt-5">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="lg:w-2/3 mb-4 px-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li className="nav-item flex" role="presentation">
                    <a
                      className="nav-link flex items-center justify-center w-full active"
                      id="ex1-tab-1"
                      data-mdb-toggle="pill"
                      href="#ex1-pills-1"
                      role="tab"
                      aria-controls="ex1-pills-1"
                      aria-selected="true"
                    >
                      THÔNG TIN CHI TIẾT
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="ex1-content">
                  <div
                    className="tab-pane fade show active"
                    id="ex1-pills-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    <p className="text-base leading-6 text-gray-800 p-5">
                      Haven là thương hiệu gia dụng cao cấp Việt Nam, được thiết
                      kế và sản xuất theo phong cách và tiêu chuẩn Nhật Bản.
                      100% sản phẩm của Haven được làm từ chất liệu nhựa nguyên
                      sinh cao cấp theo quy trình chuẩn ISO 9001, không chứa
                      BPA, đạt chứng nhận an toàn của bộ y tế, đảm bảo điều kiện
                      vệ sinh và sức khỏe cho người sử dụng. Haven chuyên sản
                      xuất các mặt hàng gia dụng nhà bếp như thùng rác, các loại
                      thau rổ – đồ tiện ích, hộp đựng thực phẩm, móc áo, màng –
                      túi, các sản phẩm cho mẹ và bé, dụng cụ vệ sinh và các
                      loại hộp cơm, cốc giữ nhiệt nhập khẩu trực tiếp từ thương
                      hiệu Asvel – Nhật Bản.
                    </p>
                    <table className="table-auto w-full mt-3 mb-2">
                      <tbody>
                        <tr>
                          <th className="py-2 text-left">Chất liệu:</th>
                          <td className="py-2 text-left">
                            Nhựa nguyên sinh cao cấp
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Kích thước:</th>
                          <td className="py-2 text-left">30 x 20 x 10 cm</td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Dung tích:</th>
                          <td className="py-2 text-left">2 lít</td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Trọng lượng:</th>
                          <td className="py-2 text-left">500g</td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Xuất xứ:</th>
                          <td className="py-2 text-left">Việt Nam</td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Màu sắc:</th>
                          <td className="py-2 text-left">
                            Trắng, Xanh dương, Xanh lá, Hồng
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2 text-left">Tiêu chuẩn:</th>
                          <td className="py-2 text-left">
                            ISO 9001, không chứa BPA
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 px-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <div className="bg-yellow-300 text-center pt-3">
                      <h5 className="card-title mb-5 font-medium text-2xl pb-4 text-center bold">
                        Các mặt hàng liên quan khác
                      </h5>
                    </div>
                    {relatedProducts.map((relatedProduct: any) => (
                      <div className="flex mb-3" key={relatedProduct.id}>
                        <a href="#" className="me-3">
                          <img
                            src={relatedProduct?.imageUrls[0]?.url}
                            className="w-24 h-24 object-cover img-thumbnail"
                            alt={`Product ${relatedProduct.name}`}
                          />
                        </a>
                        <div className="info flex flex-col">
                          <a href="#" className="nav-link mb-1">
                            {relatedProduct.name}
                          </a>

                          <div>
                            <strong className="text-dark me-5">
                              {Math.round(
                                (relatedProduct.price *
                                  (100 - relatedProduct.discount)) /
                                  100
                              ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                useGrouping: true,
                              })}
                            </strong>
                            <del className="text-gray-400">
                              {relatedProduct.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                useGrouping: true,
                              })}
                            </del>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
