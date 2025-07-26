import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MenuSort from "./MenuSort";

const MenuBtn = () => {
  const [openSort, setOpenSort] = useState(false);

  return (
    <div className="absolute z-10 left-0 bg-gray-100 p-3 rounded-xl backdrop:blur">
      <button
        onClick={() => setOpenSort((prev) => !prev)}
        className="flex items-center gap-30"
      >
        <span>Sắp xếp</span>
        <ChevronDown
          className={`transition-transform ${openSort ? "rotate-180" : ""}`}
        />
      </button>

      <MenuSort open={openSort} />
    </div>
  );
};

export default MenuBtn;
