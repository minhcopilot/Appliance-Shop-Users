import Hero from "@/components/header/Hero";
import FoodGroup from "@/components/main/FoodGroup";
import SectionSalesProduct from "@/components/main/SectionSalesProduct";
import SectionMotherBaby from "@/components/main/SectionMotherBaby";
import SectionAsvelRetainsHeat from "@/components/main/SectionAsvelRetainsHeat";
import StepsComponent from "@/components/main/SectionoperationSteps";
import { ArticleList } from "@/components/article/ArticleList";
import { getSubject } from "@/hooks/blog/useGet";
import ReviewInterface from "@/components/main/ReviewInterface";

export default async function Home() {
  const reviewData = [
    {
      name: "Phan Lê Văn Minh",
      rating: 5,
      comment:
        "Sản phẩm chất lượng tốt, giá cả phải chăng, giao hàng nhanh và thân thiện. Tôi rất khuyên dùng.",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocKiW4dCZfKzZQo7V2mv_yjy6tUHW-zvvnnTBbU2QmZV7_38vdY=s96-c",
    },
    {
      name: "Lê Minh Vương",
      rating: 4,
      comment: "Website dễ dàng điều hướng và dịch vụ khách hàng nhanh chóng.",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJYdazcqPBtNxFA6qhe_SMNUhYtwCsb7AP4jDMdfB0f1ZmXc6lO=s96-c",
    },
    {
      name: "Lê Phước Đức",
      rating: 3,
      comment: "Lựa chọn sản phẩm tốt, nhưng một số mặt hàng đã hết hàng.",
      avatar:
        "https://res.cloudinary.com/dtvekokcw/image/upload/v1715792150/customers/xi8hmcynrsscefzpbkrv.jpg",
    },
  ];
  const postList = await getSubject(`article/posts/?category=khuyen-mai`);
  return (
    <main className="container mt-44">
      <Hero />
      <FoodGroup />
      <SectionSalesProduct />
      <StepsComponent />
      <SectionMotherBaby />
      <SectionAsvelRetainsHeat />
      <div>
        <div className="p-4 my-8 text-center bg-yellow-300">
          <h1 className="text-xl font-bold uppercase ">Tin tức khuyến mãi</h1>
          <p className="">
            Cập nhật các chương trình khuyến mãi, ưu đãi hấp dẫn cho khách hàng.
          </p>
        </div>
        <ArticleList postList={postList} />
      </div>
      <div className="py-8 ">
        <ReviewInterface reviews={reviewData} />
      </div>
    </main>
  );
}
