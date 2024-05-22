import ProductCard from "@/components/products/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductSlidesProps {
  title: string;
  description?: string;
  products: any[]; // Thêm prop products
}

const ProductSlides: React.FC<ProductSlidesProps> = ({
  title,
  description,
  products,
}) => {
  const chunkSize = 4;
  const productChunks = [];
  const topFourProducts = products.slice(0, 12);
  for (let i = 0; i < topFourProducts.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    productChunks.push(chunk);
  }

  return (
    <div className="mt-16 ">
      <div className="py-4 text-center bg-yellow-300">
        <h2 className="text-xl font-bold uppercase">{title}</h2>
        <p className="">{description}</p>
      </div>
      <Carousel className="w-full mx-auto mt-7">
        <CarouselContent>
          {productChunks.map((chunk: any[], index: number) => (
            <CarouselItem key={index}>
              <div className="flex justify-around py-5 space-x-4">
                {chunk.map((product: any) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -translate-y-1/2 -left-8 top-1/2">
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
        <CarouselNext className="absolute -translate-y-1/2 -right-8 top-1/2">
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
