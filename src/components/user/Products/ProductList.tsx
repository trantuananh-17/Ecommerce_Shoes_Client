import type { IProductItem } from "../../../types/product.type";
import ProductItem from "../Shared/ui/ProductItem";

interface Props {
  products: IProductItem[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="grid grid-cols-3 gap-5 mt-15">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
};

export default ProductList;
