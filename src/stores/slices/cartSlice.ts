import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type CartItem = {
  productId: string;
  productName: string;
  slug: string;
  size: string;
  sizeId: string;
  price: number;
  quantity: number;
  thumbnail: string;
  sizeQuantityId: string;
  discountedPrice: number;
  stockQuantity: number;
};

export interface addCartItem {
  productId: string;
  sizeId: string;
  quantity: number;
  totalQuantity: number;
}

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
    addToCart(state, action: PayloadAction<addCartItem>) {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.sizeId === action.payload.sizeId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.totalQuantity = action.payload.totalQuantity;
      } else {
        state.totalQuantity = action.payload.totalQuantity + 1;
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; sizeId: string }>
    ) {
      const index = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.sizeId === action.payload.sizeId
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

    setCartDefault(state) {
      state.cartLoaded = false;
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
  setCartDefault,
  setCartItems,
  setCartSummary,
  setTotalPrices,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export const getCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
