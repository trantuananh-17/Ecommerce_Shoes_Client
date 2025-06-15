// src/components/user/Landing/ListProduct.tsx
import { useContext } from "react";
import ProductItem from "../Shared/ui/ProductItem";
import type { IProductItem } from "../../../types/product.type";
import ProductContext from "../../../context/ProductContext";

const ListProduct = () => {
  const bestSellerList = useContext(ProductContext);

  if (!bestSellerList || bestSellerList.length === 0) {
    return <p className="text-center py-10">No bestseller products found.</p>;
  }

  return (
    <ul className="mt-8 lg:grid grid-cols-4 gap-7">
      {bestSellerList.map((product: IProductItem) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ListProduct;
