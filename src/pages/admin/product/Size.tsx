import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Size = {
  id: number;
  name: string;
};

const Size: React.FC = () => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState<Size[]>([
    { id: 1, name: "S" },
    { id: 2, name: "M" },
    { id: 3, name: "L" },
  ]);

  const [newSize, setNewSize] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSize(e.target.value);
  };

  const handleAddSize = (e: FormEvent) => {
    e.preventDefault();
    if (!newSize.trim()) return;

    const newEntry: Size = {
      id: sizes.length + 1,
      name: newSize.trim(),
    };

    setSizes([...sizes, newEntry]);
    setNewSize("");
  };

  const handleClose = () => {
    navigate(-1); // Quay lại trang trước đó
  };
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Overlay tối */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Popup nội dung */}
      <div
        className="relative bg-white p-6 rounded shadow-lg w-[400px] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Size Management</h2>

        <form onSubmit={handleAddSize} className="mb-6">
          <input
            type="text"
            value={newSize}
            onChange={handleInputChange}
            placeholder="Enter size name (e.g. XL)"
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Size
          </button>
        </form>

        <ul className="space-y-2">
          {sizes.map((size) => (
            <li key={size.id} className="border-b pb-1">
              {size.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Size;
