import Image from "next/image";
import Link from "next/link";

interface FoodBoxProps {
  imageUrl: string;
  title: string;
}

const FoodBox: React.FC<FoodBoxProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col p-4 space-x-4 bg-white rounded-lg shadow-md">
      <Link href={"/products"}>
        <Image
          src={imageUrl}
          alt={title}
          width={290}
          height={290}
          className="object-contain transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold hover:text-yellow-500">
            {title}
          </h3>
          <p className="text-yellow-500 hover:text-yellow-600">Xem tất cả</p>
        </div>
      </Link>
    </div>
  );
};

export default FoodBox;
