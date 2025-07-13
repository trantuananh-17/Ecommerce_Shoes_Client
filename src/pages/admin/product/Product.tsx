import { useState } from "react";
import Pagination from "../../../components/admin/ui/Pagination";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import { useToggle } from "../../../hooks/useToggle";
import Size from "../other/Size";
import ButtonForm from "../../../components/admin/ui/button/ButtonForm";

import Category from "../other/Category";
import Closure from "../other/Closure";
import Material from "../other/Material";
import Color from "../other/Color";
import DropDownButtonOther from "../../../components/admin/ui/button/DropDownButtonOther";
import { CirclePlus } from "lucide-react";
import SearchInput from "../../../components/admin/ui/input/SearchInput";

const Product = () => {
  const [isSize, toggleSize] = useToggle(false);
  const [isCategory, toggleCategory] = useToggle(false);
  const [isClosure, toggleClosure] = useToggle(false);
  const [isMaterial, toggleMaterial] = useToggle(false);
  const [isColor, toggleColor] = useToggle(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuery, setInputQuery] = useState("");

  const [page, setPage] = useState(1);

  return (
    <div className="bg-white w-full h-full p-5">
      <div className="flex justify-between ">
        <SearchInput
          value={inputQuery}
          onChange={setInputQuery}
          onSearch={() => setSearchQuery(inputQuery)}
        />
        <div className="flex gap-2">
          <DropDownButtonOther
            toggleColor={toggleColor}
            toggleCategory={toggleCategory}
            toggleClosure={toggleClosure}
            toggleMaterial={toggleMaterial}
            toggleSize={toggleSize}
          />
          <ButtonForm
            name="Thêm sản phẩm"
            onClick={toggleSize}
            icon={CirclePlus}
          />
        </div>
      </div>

      {/* <TableManyColumn
        columns={["Product Name", "Color", "Price"]}
        data={data}
        showEdit
        showDelete
        showToggle
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
        onToggle={(id, enabled) => console.log("Toggle", id, enabled)}
      /> */}
      <Pagination
        currentPage={page}
        totalItems={33}
        pageSize={2}
        column={true}
        onPageChange={(newPage) => setPage(newPage)}
      />
      {isSize && <Size onClose={toggleSize} />}
      {isCategory && <Category onClose={toggleCategory} />}
      {isClosure && <Closure onClose={toggleClosure} />}
      {isMaterial && <Material onClose={toggleMaterial} />}
      {isColor && <Color onClose={toggleColor} />}
    </div>
  );
};

export default Product;
