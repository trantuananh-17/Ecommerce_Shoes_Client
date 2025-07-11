import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type CartItem = {
  productId: string;
  productName: string;
  slug: {
    vi: string;
    en: string;
  };
  size: string;
  sizeId: string;
  price: number;
  quantity: number;
  thumbnail: string;
  sizeQuantityId: string;
  discountedPrice: number;
  stockQuantity: number;
};

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  cartLoaded: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartLoaded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; size: string }>
    ) {
      const index = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (index !== -1) {
        state.totalQuantity -= 1;
        state.items.splice(index, 1);
      }
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    setCartSummary(state, action: PayloadAction<{ totalQuantity: number }>) {
      state.totalQuantity = action.payload.totalQuantity;
    },

    setTotalPrices(state, action: PayloadAction<{ totalPrice: number }>) {
      state.totalPrice = action.payload.totalPrice;
    },

    setCartLoaded(state) {
      state.cartLoaded = true;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.cartLoaded = false;
    },

    updateQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>
    ) {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartLoaded,
  setCartItems,
  setCartSummary,
  setTotalPrices,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export const getCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
