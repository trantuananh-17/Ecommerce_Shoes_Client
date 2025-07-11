import { FaCheckCircle } from "react-icons/fa";
import AverageRating from "../Shared/AverageRating";
import { MdCancel } from "react-icons/md";
import type { Size } from "../../../types/product.type";
import SizeItem from "./ui/SizeItem";
import { useState } from "react";
import { CircleCheck, Info } from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import ButtonSubmit from "./ui/ButtonSubmit";
import HeartWishList from "./ui/HeartWishList";
import InfoItem from "./ui/InfoItem";

interface Props {
  name: string;
  averageRating: number;
  price: number;
  color: string;
  material: string;
  closure: string;
  discountedPrice: number;
  discountPercentage: number;
  sizesWithQuantity: number;
  sizes: Size[];
  isInWishlist: boolean;
}

const ProductInfo: React.FC<Props> = ({
  name,
  color,
  material,
  closure,
  sizes,
  price,
  averageRating,
  sizesWithQuantity,
  discountedPrice,
  discountPercentage,
  isInWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="col-span-2 mt-6">
      <h2 className="text-xl lg:text-3xl font-semibold">{name}</h2>
      <AverageRating averageRating={averageRating} />

      {discountPercentage > 0 ? (
        <div className="flex items-center gap-2">
          <p className="mt-3 text-xl  text-gray-400 line-through">
            {formatCurrency(price)}
          </p>
          <p className="mt-3 font-bold"> - </p>
          <p className="mt-3 text-xl font-semibold">
            {formatCurrency(discountedPrice)}
          </p>
          <p className="bg-red-200 p-1 rounded text-red-500 text-sm font-semibold">
            {discountPercentage} %
          </p>
        </div>
      ) : (
        <p className="mt-3 text-xl font-semibold ">{formatCurrency(price)}</p>
      )}

      <div className="mt-2 border-t border-gray">
        {sizesWithQuantity > 0 ? (
          <p className="flex items-center gap-1 mt-4">
            <FaCheckCircle className="mr-1 size-6 text-green-600" />
            <span className="text-green-600 font-semibold text-md">
              In stock
            </span>
          </p>
        ) : (
          <p className="flex items-center gap-1 mt-4">
            <MdCancel className="mr-1 size-6 text-red-600" />
            <span className="text-red-600 font-semibold text-md">
              Out stock
            </span>
          </p>
        )}

        <div className="flex gap-5">
          <InfoItem title="Màu sắc" name={color} />
          <InfoItem title="Chất liệu" name={material} />
          <InfoItem title="Kiểu buộc" name={closure} />
        </div>

        <div className=" ">
          <p>Kích cỡ:</p>
          <div className="flex gap-3 mt-1">
            {sizes.map((size: Size) => (
              <SizeItem
                key={size.sizeId}
                size={size.sizeName}
                quantity={size.quantity}
                isSelected={selectedSize === size.sizeName}
                onClick={(size) => setSelectedSize(size)}
              />
            ))}
          </div>
          {selectedSize ? (
            <>
              <p className="mt-3 text-sm text-green-600">
                Số lượng còn lại:{" "}
                {sizes.find((s) => s.sizeName === selectedSize)?.quantity ?? 0}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-red-500 flex gap-1">
              <Info size={20} />
              Vui lòng chọn kích cỡ
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-3">
            <p>Số lượng: </p>
            <div className="flex items-center w-max relative">
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xl  flex items-center justify-center"
              >
                -
              </button>
              <input
                type="text"
                className="w-[100px] h-[40px] border px-10 border-gray rounded-full text-center"
                value="1"
                readOnly
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl  flex items-center justify-center "
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-2">
          <ButtonSubmit name="Add to card" />
          <ButtonSubmit name="Buy now" primary />
          <div className="flex items-center">
            <HeartWishList isInWishlist={isInWishlist} />
          </div>
        </div>

        <div className="mt-6 p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
          <div>
            <CircleCheck color="green" />
          </div>
          <div className="text-sm">
            <p className="text-lightGray">
              Pickup available at{" "}
              <span className="font-semibold text-black"> Akaze store</span>
            </p>
            <p className="text-xs text-lightGray mt-1">
              Usually ready in 24 hours
            </p>
            <a
              href="https://maps.app.goo.gl/svSNvpY3HroS6kwy7"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-xs mt-4"
            >
              View store information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
