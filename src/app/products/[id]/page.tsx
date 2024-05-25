import React from "react";
import { axiosClient } from "@/lib/axiosClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToCartButton from "@/components/cart/AddToCart";
import ProductCard from "@/components/products/ProductCard";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export const revalidate = false; // false | 0 | number (seconds)

export async function generateStaticParams() {
  const response = await axiosClient.get("/products");
  return response.data.map((product: any) => ({
    id: product.id?.toString(),
  }));
}
async function getAllProducts() {
  const response = await axiosClient.get("/products");
  const data = response.data;
  return data;
}

async function getProducts({ id }: { id: string }) {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
}


type Props = {
  params: {
    id: string;
  };
};

export default async function Product({ params }: Props) {
  const { id } = params;
  const product = await getProducts({ id });
  const products = await getAllProducts();


  return (
    <>
      <section className="py-5 mt-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                >
                  <img
                    style={{ maxWidth: "60%", maxHeight: "100vh", margin: "auto" }}
                    className="rounded-4 fit"
                    src={product?.imageUrls[0]?.url}
                    alt="Product"
                  />
                </a>
              </div>

              <div className="d-flex justify-content-center mb-3">
                {product?.imageUrls.slice(1, 4).map((image: any, index: number) => (
                  <a
                    data-fslightbox="mygalley"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    data-type="image"
                    href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big1.webp"

                  >
                    <img
                      key={index}
                      width="130"
                      height="60"
                      className="rounded-2"
                      src={image.url}
                      alt="Thumbnail 1"
                    />
                  </a>
                ))}
              </div>

            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {product.name}
                </h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ms-1">
                      4.5
                    </span>
                  </div>
                  <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 lượt đặt hàng</span>
                  <span className="text-success ms-2">Đang tồn kho</span>
                </div>

                <div className="mb-3">
                  <span className="h5">{product.price}</span>
                  <span className="text-muted">đ</span>
                </div>

                <p>
                  {product.description}
                </p>

                <div className="row">
                  <dt className="col-3">Xuất sứ:</dt>
                  <dd className="col-9">Nhật bản</dd>

                  <dt className="col-3">Màu sắc</dt>
                  <dd className="col-9">{product.color}</dd>

                  <dt className="col-3">Vật liệu</dt>
                  <dd className="col-9">Nhựa</dd>

                  <dt className="col-3">Loại sản phẩm</dt>
                  <dd className="col-9">{product.category.name}</dd>
                </div>

                <hr />

                <div className="row mb-4">
      <div className="col-md-4 col-6">
        <label className="mb-2">Size</label>
        <select className="form-select border border-secondary" style={{ height: '35px' }}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      {/* col.// */}
      <div className="col-md-4 col-6 mb-3">
        <label className="mb-2 d-block">Quantity</label>
        <div className="input-group mb-3" style={{ width: '170px' }}>
          <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1">
            <MinusOutlined />
          </button>
          <input
            type="text"
            className="form-control text-center border border-secondary"
            placeholder="1"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
          <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2">
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>

                <div className="mt-4">
                  <AddToCartButton
                    product={product}
                    className="text-white bg-red-500 px-4 py-2 rounded-md"
                  />
                </div>

              </div>
            </main>
          </div>
        </div>
      </section>




      <section className="bg-light border-top py-4 mt-5">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                  <li className="nav-item d-flex" role="presentation">
                    <a className="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">THÔNG TIN CHI TIẾT</a>
                  </li>

                </ul>
                {/* Pills navs */}
                <div className="tab-content" id="ex1-content">
                  <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                    <p style={{ fontSize: '15px', lineHeight: '1.5', color: '#333', padding: 20 }}>
                      Haven là thương hiệu gia dụng cao cấp Việt Nam, được thiết kế và sản xuất theo phong cách và tiêu chuẩn Nhật Bản. 100% sản phẩm của Haven được làm từ chất liệu nhựa nguyên sinh cao cấp theo quy trình chuẩn ISO 9001, không chứa BPA, đạt chứng nhận an toàn của bộ y tế, đảm bảo điều kiện xuất khẩu sang những thị trường khó tính nhất như Mỹ, EU, Nhật Bản…
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: '1.5', color: '#333', padding: 20 }}>
                    Các sản phẩm của Haven rất đa dạng, phục vụ tối đa mọi nhu cầu trong cuộc sống hàng ngày như: kệ nhựa – giỏ nhựa, thùng rác, các loại thau rổ – đồ tiện ích, hộp đựng thực phẩm, móc áo, màng – túi, các sản phẩm cho mẹ và bé, dụng cụ vệ sinh và các loại hộp cơm, cốc giữ nhiệt nhập khẩu trực tiếp từ thương hiệu Asvel – Nhật Bản.
                    </p>
                    <table className="table table-striped table-hover mt-3 mb-2">
                      <tbody>
                        <tr>
                          <th className="py-2">Chất liệu:</th>
                          <td className="py-2">Nhựa nguyên sinh cao cấp</td>
                        </tr>
                        <tr>
                          <th className="py-2">Kích thước:</th>
                          <td className="py-2">30 x 20 x 10 cm</td>
                        </tr>
                        <tr>
                          <th className="py-2">Dung tích:</th>
                          <td className="py-2">2 lít</td>
                        </tr>
                        <tr>
                          <th className="py-2">Trọng lượng:</th>
                          <td className="py-2">500g</td>
                        </tr>
                        <tr>
                          <th className="py-2">Xuất xứ:</th>
                          <td className="py-2">Việt Nam</td>
                        </tr>
                        <tr>
                          <th className="py-2">Màu sắc:</th>
                          <td className="py-2">Trắng, Xanh dương, Xanh lá, Hồng</td>
                        </tr>
                        <tr>
                          <th className="py-2">Tiêu chuẩn:</th>
                          <td className="py-2">ISO 9001, không chứa BPA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pills content */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <div className="bg-yellow-300 text-center pt-3">
                    <h5 className="card-title mb-5 font-medium text-2xl pb-4 text-center bold">Các mặt hàng liên quan khác</h5>
                    </div>
                    {products.slice(0, 5).map((product: any) => (

                      <div className="d-flex mb-3">
                        <a href="#" className="me-3">
                          <img
                            src={product?.imageUrls[0]?.url}
                            style={{
                              width: "96px",
                              height: "96px",
                              objectFit: "cover"
                            }}
                            className="img-md img-thumbnail"
                            alt="Product 1"
                          />
                        </a>
                        <div className="info">
                          <a href="#" className="nav-link mb-1">
                            {product.name}
                          </a>
                          <strong className="text-dark"> {product.price}đ</strong>
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
}
