import { useState } from "react";
import Pagination from "../../components/admin/ui/Pagination";
import TableManyColumn from "../../components/admin/ui/TableManyColumn";
import { useToggle } from "../../hooks/useToggle";
import Size from "./other/Size";

const Product = () => {
  const [isSize, toggleSize] = useToggle(false);

  const columns = ["Product Name", "Color", "Category", "Price"];
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
    <div className="bg-white w-full h-full p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* <button type="submit" onClick={toggleSize}>
        Size1
      </button>

      {isSize && <Size onClose={toggleSize} />} */}

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
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Product;
