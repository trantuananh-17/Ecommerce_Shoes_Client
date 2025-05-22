import { useToggle } from "../../hooks/useToggle";
import Size from "./other/Size";

const Product = () => {
  const [isSize, toggleSize] = useToggle(false);

  return (
    <div className="bg-white w-full h-full">
      <h1 className="text-xl font-bold mb-4">Product Page</h1>

      <button type="submit" onClick={toggleSize}>
        Size1
      </button>

      {isSize && <Size onClose={toggleSize} />}
    </div>
  );
};

export default Product;
