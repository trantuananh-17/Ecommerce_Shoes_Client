import ProductItem from "../Shared/ui/ProductItem";
import product from "../../../assets/images/img_product_thumb4.webp";
const ListProduct = () => {
  return (
    <ul className="mt-8 lg:grid grid-cols-4 gap-7">
      <ProductItem image={product} />
      <ProductItem image={product} />
      <ProductItem image={product} />
      <ProductItem image={product} />
    </ul>
  );
};

export default ListProduct;
