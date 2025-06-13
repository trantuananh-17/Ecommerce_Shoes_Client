// ProductContext.tsx
import { createContext } from "react";
import type { IProductItem } from "../types/product.type";

const ProductContext = createContext<IProductItem[] | null>(null);
export default ProductContext;
