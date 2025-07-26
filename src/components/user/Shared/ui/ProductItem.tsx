import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../../utils/formatCurrency";
import AverageRating from "../AverageRating";

interface Props {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountedPrice: number;
  isDiscounted: boolean;
  discountPercentage: number;
  averageRating: number;
  sizesWithQuantity: number;
  thumbnail: string;
}

const ProductItem: React.FC<Props> = ({
  thumbnail,
  name,
  slug,
  price,
  discountedPrice,
  discountPercentage,
  averageRating,
  sizesWithQuantity,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <li
      onClick={handleClick}
      className="mt-6 md:mt-0 text-center group relative "
    >
      <div className="bg-red ">
        {sizesWithQuantity === 0 ? (
          <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-black text-white rounded-xl">
            Out of stock
          </span>
        ) : discountPercentage > 0 ? (
          <span className="absolute py-2 text-xs px-3 top-3 left-3 bg-red-600 text-white rounded-2xl">
            {discountPercentage} %
          </span>
        ) : (
          <></>
        )}

        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
          <img className="size-full image " src={thumbnail} alt="" />
        </div>
        <div className="flex justify-center items-center my-1">
          <AverageRating averageRating={averageRating} />
        </div>
        <h3 className="text-15 mt-2 line-clamp-1">{name}</h3>
      </div>
      <div className="mt-2 relative h-5 overflow-hidden">
        <a href="product-detail.html" className="bg-red"></a>
        <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
          <a href="product-detail.html" className="bg-red">
            <div className="flex items-center justify-center font-bold text-[14px] text-center">
              <span className="">
                {price} - {discountedPrice}
              </span>
            </div>
          </a>

          {discountPercentage > 0 ? (
            <div className="flex items-center gap-2">
              <p className="font-bold text-[14px]  text-gray-400 line-through">
                {formatCurrency(price)}
              </p>
              <p className="font-bold text-[14px]"> - </p>
              <p className=" font-bold text-[14px] ">
                {formatCurrency(discountedPrice)}
              </p>
            </div>
          ) : (
            <p className=" font-bold text-[14px] ">{formatCurrency(price)}</p>
          )}
          <a
            href="#none"
            className="uppercase text-xs font-semibold tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
          >
            Add to cart
          </a>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
