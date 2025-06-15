import { useState } from "react";
import type { Brand, Material } from "../../../types/product.type";
import Description from "./ui/Description";
import PaymentTabs from "./ui/PaymentTabs";
import Return from "./ui/Return";

interface Props {
  name: string;
  color: string;
  category: string;
  description: string;
  brand: Brand;
  material: Material;
  closure: string;
}
const ProductTabs: React.FC<Props> = ({
  name,
  category,
  closure,
  color,
  description,
  brand,
  material,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <Description
            name={name}
            category={category}
            closure={closure}
            color={color}
            description={description}
            brand={brand}
            material={material}
          />
        );
      case "payment":
        return <PaymentTabs />;
      case "return":
        return <Return />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 font-medium rounded-full transition duration-200 ${
            activeTab === "description"
              ? "bg-black text-white"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 py-2 font-medium rounded-full transition duration-200 ${
            activeTab === "payment"
              ? "bg-black text-white"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Payment
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={`px-4 py-2 font-medium rounded-full transition duration-200 ${
            activeTab === "return"
              ? "bg-black text-white"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Return
        </button>
      </div>

      <div className="text-gray-700">{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
