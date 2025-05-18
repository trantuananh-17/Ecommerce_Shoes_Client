import { Outlet } from "react-router-dom";
import ButtonNav from "../../../components/admin/ui/ButtonNav";

const Product = () => {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Product Page</h1>

      {/* Button mở popup size */}
      <ButtonNav to="/admin/product/size" label="Add Size" />

      {/* Render modal size qua <Outlet /> */}
      <Outlet />
    </div>
  );
};

export default Product;
