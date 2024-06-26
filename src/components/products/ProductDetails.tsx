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
      <section className="py-3 mt-3 md:py-5 md:mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <aside className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <div className="mb-3 flex justify-center">
                <img
                  className="rounded-lg w-full max-w-sm md:max-w-md"
                  src={product?.imageUrls[0]?.url}
                  alt="Product"
                />
              </div>
              <div className="flex justify-center mb-3 overflow-x-auto">
                {product?.imageUrls
                  .slice(1, 4)
                  .map((image: any, index: any) => (
                    <div
                      key={index}
                      className="border mx-1 rounded-md flex-shrink-0"
                    >
                      <img
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
              </div>
            </aside>
            <main className="w-full md:w-1/2 px-4">
              <div>
                <h4 className="text-black text-2xl md:text-4xl mb-2">
                  {product.name}
                </h4>
                <div className="flex flex-wrap items-center my-3">
                  <div className="flex items-center text-yellow-400 mr-4">
                    4.5 <Star size={16} className="ml-1" />
                  </div>
                  <div className="mr-4">
                    <span className="text-gray-400 text-sm">
                      5,000+ đã mua hàng
                    </span>
                  </div>
                  <div className="text-green-400 text-sm">
                    {product.stock} sản phẩm có sẵn
                  </div>
                </div>

                <div className="mb-3">
                  <span className="font-medium text-yellow-400 text-xl mr-4">
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

                <div className="grid grid-cols-2 gap-4 mb-4">
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
                  {/* <div>
                    <label className="block mb-2">Kích thước</label>
                    <select className="form-select border border-secondary h-10 w-full rounded">
                      <option>Nhỏ</option>
                      <option>Vừa</option>
                      <option>Lớn</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block mb-2">Số lượng</label>
                    <div className="flex items-center border border-secondary h-10 w-full rounded">
                      <button
                        className="btn bg-white border-r border-secondary px-3 h-full"
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        <MinusOutlined />
                      </button>
                      <input
                        type="number"
                        className="form-control text-center border-none flex-grow"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value))
                        }
                      />
                      <button
                        className="btn bg-white border-l border-secondary px-3 h-full"
                        type="button"
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
                    className="text-white bg-red-500 px-4 py-2 rounded-md w-full md:w-auto"
                    quantity={quantity}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-light border-t py-4 mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="w-full md:w-2/3 mb-4 px-4">
              <div className="border rounded-lg p-4 bg-white">
                <h2 className="text-xl font-semibold mb-4">
                  THÔNG TIN CHI TIẾT
                </h2>
                <p className="text-base leading-6 text-gray-800 mb-4">
                  Haven là thương hiệu gia dụng cao cấp Việt Nam, được thiết kế
                  và sản xuất theo phong cách và tiêu chuẩn Nhật Bản...
                </p>
                <table className="table-auto w-full">
                  <tbody>
                    <tr>
                      <th className="py-2 text-left">Chất liệu:</th>
                      <td className="py-2 text-left">
                        Nhựa nguyên sinh cao cấp
                      </td>
                    </tr>
                    {/* ... other table rows ... */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="border rounded-lg shadow-sm bg-white">
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-4 text-center">
                    Các mặt hàng liên quan khác
                  </h5>
                  {relatedProducts.map((relatedProduct: any) => (
                    <div className="flex mb-4" key={relatedProduct.id}>
                      <a href="#" className="mr-3 flex-shrink-0">
                        <img
                          src={relatedProduct?.imageUrls[0]?.url}
                          className="w-20 h-20 object-cover rounded"
                          alt={`Product ${relatedProduct.name}`}
                        />
                      </a>
                      <div className="flex flex-col justify-between">
                        <a
                          href="#"
                          className="text-sm font-medium hover:text-blue-500"
                        >
                          {relatedProduct.name}
                        </a>
                        <div>
                          <strong className="text-sm text-dark block">
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
                          <del className="text-xs text-gray-400">
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
      </section>
    </>
  );
};

export default ProductDetails;
