import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../../../stores/slices/cartSlice";
import { formatCurrency } from "../../../utils/formatCurrency";

interface Props {
  cartItem: CartItem;
  onDelete: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange: (newQuantity: number) => void;
  onProductInfo: (slug: string) => void;
}

const CartItemInfo: React.FC<Props> = ({
  cartItem,
  onDelete,
  onIncrease,
  onDecrease,
  onQuantityChange,
  onProductInfo,
}) => {
  const [inputQuantity, setInputQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    setInputQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value);

    if (newQuantity > cartItem.stockQuantity) {
      newQuantity = cartItem.stockQuantity;
    }

    if (!isNaN(newQuantity) && newQuantity > 0) {
      setInputQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const isDecreaseDisabled = inputQuantity <= 1;
  const isIncreaseDisabled = inputQuantity >= cartItem.stockQuantity;

  const handleBlur = () => {
    if (inputQuantity === 0 || isNaN(inputQuantity)) {
      setInputQuantity(1);
      onQuantityChange(1);
    }
  };

  return (
    <div className="flex">
      <div className="p-2 lg:p-5 border border-gray w-2/4">
        <div className="flex items-center gap-3">
          <div className="w-28 overflow-hidden">
            <img src={cartItem.thumbnail} alt="Thumbnail ảnh giày" />
          </div>
          <div>
            <p
              className="text-xs uppercase input-2 line-clamp-2"
              onClick={() => onProductInfo(cartItem.slug)}
            >
              {cartItem.productName}
            </p>
            <span className="text-xs">
              Giá: {formatCurrency(cartItem.discountedPrice)}
            </span>
            <p className="text-xs">Kích cỡ: {cartItem.size}</p>
          </div>
        </div>
      </div>

      <div className="p-5 border border-gray w-1/4 justify-center lg:flex hidden">
        <div className="flex items-center w-max relative">
          <button
            type="button"
            className="text-lg absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={onDecrease}
            disabled={isDecreaseDisabled}
          >
            {isDecreaseDisabled ? (
              <span className="text-2xl text-gray-400 leading-[24px]">-</span>
            ) : (
              <span className="text-2xl leading-[24px]">-</span>
            )}
          </button>

          <input
            type="text"
            className="w-[120px] h-[40px] border px-10 border-black rounded-full text-center"
            value={inputQuantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
          />

          <button
            type="button"
            className="text-lg absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={onIncrease}
            disabled={isIncreaseDisabled}
          >
            {isIncreaseDisabled ? (
              <span className="text-2xl text-gray-400 leading-[24px]">+</span>
            ) : (
              <span className="text-2xl leading-[24px]">+</span>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
        {formatCurrency(cartItem.discountedPrice * cartItem.quantity)}
      </div>

      <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
        <button type="button" onClick={onDelete}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default CartItemInfo;
