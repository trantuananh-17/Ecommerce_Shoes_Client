import ico_search from "../../../../assets/images/ico_search.png";
import ico_heart from "../../../../assets/images/ico_heart.png";
import { useNavigate } from "react-router-dom";
import AverageRating from "../AverageRating";
import { formatCurrency } from "../../../../utils/formatCurrency";

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
      className="mt-6 md:mt-0 text-center group relative"
    >
      <div className="bg-red">
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

        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
          <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <button
              type="button"
              className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
            >
              <img
                src={ico_heart}
                className="image size-4 rouded-full"
                alt=""
              />
            </button>
          </li>
          <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
            <button
              type="button"
              className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-100 transition-all"
            >
              <img
                src={ico_search}
                className="image size-4 rouded-full"
                alt=""
              />
            </button>
          </li>
        </ul>

        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
          <img
            className="block size-full object-cover image"
            src={thumbnail}
            alt=""
          />
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
