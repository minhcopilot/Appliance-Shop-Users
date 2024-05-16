import ProductSlides from "@/components/ui/ProductSlide";
import Hero from "@/components/header/Hero";

export default function Home() {
  return (
    <main className="mt-44 container">
      <Hero />

      {/* <NewProducts /> */}
      <ProductSlides
        title="HOT SALE MỖI NGÀY"
        description="Sản phẩm với giá cực kỳ hấp dẫn"
      />
    </main>
  );
}
