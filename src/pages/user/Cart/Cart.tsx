import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCartState,
  setCartDefault,
  setTotalPrices,
  type CartItem,
} from "../../../stores/slices/cartSlice";
import CartItemInfo from "../../../components/user/Cart/CartItemInfo";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  updateQuantity,
  removeFromCart,
} from "../../../stores/slices/cartSlice";
import {
  deleteCartItemAPI,
  updateQuantityAPI,
} from "../../../services/cart.service";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartLoaded, totalPrice, items = [] } = useSelector(getCartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(items);

  const updateTotalPrice = (updatedItems: CartItem[]) => {
    if (updatedItems.length === 0) {
      dispatch(setTotalPrices({ totalPrice: 0 }));
      dispatch(setCartDefault());
      return;
    }
    const newTotalPrice = updatedItems.reduce((total, item) => {
      return total + item.discountedPrice * item.quantity;
    }, 0);

    dispatch(setTotalPrices({ totalPrice: newTotalPrice }));
  };

  const handleIncrease = async (
    productId: string,
    size: string,
    quantity: number,
    sizeQuantityId: string
  ) => {
    await updateQuantityAPI({ sizeQuantityId, quantity: quantity + 1 });

    dispatch(updateQuantity({ productId, size, quantity: quantity + 1 }));

    const updatedItems = items.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: quantity + 1 }
        : item
    );
    updateTotalPrice(updatedItems);
  };

  const handleDecrease = async (
    productId: string,
    size: string,
    quantity: number,
    sizeQuantityId: string
  ) => {
    if (quantity > 1) {
      await updateQuantityAPI({ sizeQuantityId, quantity: quantity - 1 });

      dispatch(updateQuantity({ productId, size, quantity: quantity - 1 }));

      const updatedItems = items.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: quantity - 1 }
          : item
      );
      updateTotalPrice(updatedItems);
    }
  };

  const handleQuantityChange = async (
    productId: string,
    size: string,
    newQuantity: number,
    sizeQuantityId: string
  ) => {
    await updateQuantityAPI({ sizeQuantityId, quantity: newQuantity });

    dispatch(updateQuantity({ productId, size, quantity: newQuantity }));
    const updatedItems = items.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    );
    updateTotalPrice(updatedItems);
  };

  const handleDelete = async (
    productId: string,
    sizeId: string,
    sizeQuantityId: string
  ) => {
    await deleteCartItemAPI(sizeQuantityId);

    dispatch(removeFromCart({ productId, sizeId }));

    const updatedItems = items.filter(
      (item) => item.productId !== productId || item.sizeId !== sizeId
    );

    if (updatedItems.length === 0) {
      dispatch(clearCart());
    } else {
      updateTotalPrice(updatedItems);
    }
  };

  const handleGetProductInfo = async (slug: string) => {
    navigate(`/product/${slug}`);
  };

  return (
    <section className="my-15">
      <div className="">
        <h2 className="text-3xl font-semibold text-center">Shopping Cart</h2>
        <div className="container">
          <div className="md:grid grid-cols-6 mt-10 gap-8">
            <div className="col-span-4">
              <div className="border border-gray rounded-lg">
                <div className="hidden md:flex">
                  <div className="p-5 border border-gray w-2/4 flex items-center justify-center">
                    Product
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                    Quantity
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center">
                    Total
                  </div>
                  <div className="p-5 border border-gray w-1/4 flex items-center justify-center"></div>
                </div>

                {cartLoaded && items.length >= 0 ? (
                  items.map((item: CartItem) => (
                    <CartItemInfo
                      key={`${item.productId}-${item.size}`}
                      cartItem={item}
                      onDelete={() =>
                        handleDelete(
                          item.productId,
                          item.sizeId,
                          item.sizeQuantityId
                        )
                      }
                      onIncrease={() =>
                        handleIncrease(
                          item.productId,
                          item.size,
                          item.quantity,
                          item.sizeQuantityId
                        )
                      }
                      onDecrease={() =>
                        handleDecrease(
                          item.productId,
                          item.size,
                          item.quantity,
                          item.sizeQuantityId
                        )
                      }
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(
                          item.productId,
                          item.size,
                          newQuantity,
                          item.sizeQuantityId
                        )
                      }
                      onProductInfo={handleGetProductInfo}
                    />
                  ))
                ) : (
                  <p className="p-2">Your cart is empty.</p>
                )}
              </div>
            </div>

            <div className="col-span-2 mt-6 md:mt-0">
              <div className="p-7 bg-[#f7f4ef] rounded-lg">
                <h3 className="uppercase font-medium text-sm">
                  FREE SHIPPING ON ORDERS $100.00
                </h3>
                <p className="text-sm mt-2">
                  Congratulations , you've got free shipping!
                </p>
                <p className="bg-[#14c100] w-full h-1 mt-5"></p>
              </div>

              <div className="p-6 mt-4 bg-[#f6f6f6] rounded-lg">
                <p className="mt-2 font-semibold">
                  Total: {formatCurrency(totalPrice)}
                </p>

                <a
                  href="order.html"
                  className="flex items-center justify-center h-[50px] mt-6 bg-black w-full text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                >
                  Check out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
