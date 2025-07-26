import type { IProductItem } from "../../../types/product.type";
import ProductItem from "../Shared/ui/ProductItem";

interface Props {
  products: IProductItem[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-1 max-w-[1260px]">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ProductList;
