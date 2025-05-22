import { useState } from "react";
import Pagination from "../../components/admin/ui/Pagination";
import TableManyColumn from "../../components/admin/ui/TableManyColumn";
import { useToggle } from "../../hooks/useToggle";
import Size from "./other/Size";
import SearchInput from "../../components/admin/ui/SearchInput";
import ButtonForm from "../../components/admin/ui/ButtonForm";
import { CirclePlus, Layers2, LayoutGrid, Package, Ruler } from "lucide-react";

const Product = () => {
  const [isSize, toggleSize] = useToggle(false);

  const data = [
    {
      id: "1",
      "product name": 'MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      id: "2",
      "product name": "Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      id: "3",
      "product name": "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      id: "4",
      "product name": "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      id: "5",
      "product name": "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      id: "3",
      "product name": "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
  ];

  const [page, setPage] = useState(1);

  return (
    <div className="bg-white w-full h-full p-5">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>

      <div className="flex justify-between">
        <SearchInput />
        <div className="flex gap-2">
          <ButtonForm
            name="Thêm sản phẩm"
            onClick={toggleSize}
            icon={CirclePlus}
          />
          <ButtonForm name="Kích cỡ" onClick={toggleSize} icon={Ruler} />
          <ButtonForm name="Danh mục" onClick={toggleSize} icon={LayoutGrid} />
          <ButtonForm name="Loại dây" onClick={toggleSize} icon={Layers2} />
          <ButtonForm name="Chất liệu" onClick={toggleSize} icon={Package} />
        </div>
      </div>

      <TableManyColumn
        columns={["Product Name", "Color", "Price"]}
        data={data}
        showEdit
        showDelete
        showToggle
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
        onToggle={(id, enabled) => console.log("Toggle", id, enabled)}
      />
      <Pagination
        currentPage={page}
        totalItems={33}
        pageSize={2}
        column={true}
        onPageChange={(newPage) => setPage(newPage)}
      />
      {isSize && <Size onClose={toggleSize} />}
    </div>
  );
};

export default Product;
