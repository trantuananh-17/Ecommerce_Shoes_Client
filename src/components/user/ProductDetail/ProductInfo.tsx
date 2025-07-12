import { FaCheckCircle } from "react-icons/fa";
import AverageRating from "../Shared/AverageRating";
import { MdCancel } from "react-icons/md";
import type { Size } from "../../../types/product.type";
import SizeItem from "./ui/SizeItem";
import { useState } from "react";
import { Info } from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import ButtonSubmit from "./ui/ButtonSubmit";
import HeartWishList from "./ui/HeartWishList";
import InfoItem from "./ui/InfoItem";
import PickUpInfo from "./ui/PickUpInfo";
import QuantityInput from "./QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAPI, fetchDataCartAPI } from "../../../services/cart.service";
import {
  addToCart,
  getCartState,
  setCartItems,
  setCartLoaded,
  setTotalPrices,
} from "../../../stores/slices/cartSlice";

interface Props {
  id: string;
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
  id,
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
  const { totalQuantity } = useSelector(getCartState);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleIncrease = () => {
    const selectedSizeObj = sizes.find(
      (size) => size.sizeName === selectedSize
    );
    if (selectedSizeObj && quantity < selectedSizeObj.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setQuantity(selectedSizeObj?.quantity ?? quantity);
    }
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const selectedSizeObj = sizes.find(
      (size) => size.sizeName === selectedSize
    );

    if (!isNaN(value) && value >= 0) {
      if (selectedSizeObj && value <= selectedSizeObj.quantity) {
        setQuantity(value);
      } else {
        setQuantity(selectedSizeObj?.quantity ?? 1);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);

    const selectedSizeObj = sizes.find((s) => s.sizeName === size);

    if (selectedSizeObj) {
      setQuantity(1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const selectedSizeId = sizes.find(
      (size) => size.sizeName === selectedSize
    )?.sizeId;

    if (selectedSizeId) {
      const cartItem = {
        productId: id,
        sizeId: selectedSizeId,
        quantity: quantity,
        totalQuantity,
      };

      try {
        await addToCartAPI(cartItem);

        const cartItemsResponse = await fetchDataCartAPI();

        if (cartItemsResponse.data.result) {
          dispatch(addToCart(cartItem));

          dispatch(setCartItems(cartItemsResponse.data.result));

          dispatch(
            setTotalPrices({ totalPrice: cartItemsResponse.data.totalPrices })
          );

          dispatch(setCartLoaded());
        }
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    }
  };

  return (
    <div className="col-span-2 mt-6">
      <h2 className="text-xl lg:text-3xl font-semibold">{name}</h2>
      <AverageRating averageRating={averageRating} />

      {discountPercentage > 0 ? (
        <div className="flex items-center gap-2">
          <p className="mt-3 text-xl text-gray-400 line-through">
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
                onClick={() => handleSizeChange(size.sizeName)}
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

        <QuantityInput
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onQuantityChange={handleQuantityChange}
        />

        <div className="mt-5 flex justify-between gap-2">
          <ButtonSubmit name="Add to cart" onClick={handleAddToCart} />
          <ButtonSubmit name="Buy now" primary />
          <div className="flex items-center">
            <HeartWishList isInWishlist={isInWishlist} />
          </div>
        </div>
      </div>

      <PickUpInfo />
    </div>
  );
};

export default ProductInfo;
