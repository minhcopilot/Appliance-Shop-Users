import ProductCard from "@/components/products/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosClient } from "@/lib/axiosClient";

async function getProducts() {
  const response = await axiosClient.get("/products");
  const data = response.data;
  return data;
}
interface ProductSlidesProps {
  title: string;
  description: string;
}
const ProductSlides: React.FC<ProductSlidesProps> = async ({
  title,
  description,
}) => {
  const products: any = await getProducts();
  const chunkSize = 4; // Số lượng sản phẩm trong mỗi nhóm
  const productChunks = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    productChunks.push(chunk);
  }

  return (
    <div className=" mt-16">
      <div className="bg-yellow-300  py-4 text-center">
        <h2 className="text-xl font-bold uppercase">{title}</h2>
        <p className="">{description}</p>
      </div>
      <Carousel className="mx-auto w-full mt-7">
        <CarouselContent>
          {productChunks.map((chunk: any[], index: number) => (
            <CarouselItem key={index}>
              <div className="flex justify-around space-x-4 py-5">
                {chunk.map((product: any) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2">
          <span className="sr-only">Previous</span>
          <svg
            className="w-6 h-6 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </CarouselPrevious>
        <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2">
          <span className="sr-only">Next</span>
          <svg
            className="w-6 h-6 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default ProductSlides;
