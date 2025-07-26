import { useContext } from "react";
import ProductItem from "../Shared/ui/ProductItem";
import type { IProductItem } from "../../../types/product.type";
import ProductContext from "../../../context/ProductContext";
import { motion } from "framer-motion";
import { fadeIn } from "../../../motion/variants";

const ListProduct = () => {
  const bestSellerList = useContext(ProductContext);

  if (!bestSellerList || bestSellerList.length === 0) {
    return <p className="text-center py-10">No bestseller products found.</p>;
  }

  return (
    <ul className="mt-8 md:grid grid-cols-4 gap-7 flex-1">
      {bestSellerList.map((product: IProductItem, index) => (
        <motion.div
          variants={fadeIn("right", +`0.${index}`)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ProductItem key={product.id} {...product} />
        </motion.div>
      ))}
    </ul>
  );
};

export default ListProduct;
