import React, { useState, useEffect } from "react";
import TableOneColumn from "../../../components/admin/ui/TableOneColumn";
import { apiRequest } from "../../../api/apiRequest";
import axios from "axios";
import { baseURL } from "../../../api/client";
import { sizeSchema } from "../../../validator/sizeSchema";
import ValidatedInput from "../../../components/admin/ui/ValidatedInput ";

type SizeItem = {
  id: string;
  name: string;
};

type SizeResponse = {
  message: string;
  data: SizeItem[];
};

type Props = {
  onClose: () => void;
};

const auth = axios.create({ baseURL: baseURL });

const Size: React.FC<Props> = React.memo(({ onClose }) => {
  const [sizes, setSizes] = useState<SizeItem[]>([]);
  const [newSize, setNewSize] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const fetchSizes = async () => {
    try {
      const response = await apiRequest<SizeResponse>(
        auth.get("/sizes?page=1&limit=5", {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
      );

      if (response?.data) {
        setSizes(response.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleAddSize = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = newSize.trim();

    if (!trimmedName) {
      setInputError("Vui lòng nhập kích cỡ");
      return;
    }
    if (inputError) {
      return;
    }

    try {
      const response = await auth.post("/sizes", {
        name: trimmedName,
      });

      if (response.data?.data) {
        setSizes((prev) => [...prev, response.data.data]);
        setNewSize("");
        await fetchSizes();
      }
    } catch (error) {
      console.error("Failed to add size:", error);
    }
  };

  const handleDeleteSize = async (id: string) => {
    try {
      await auth.delete(`/sizes/${id}`);

      await fetchSizes();
    } catch (error) {
      console.error("Failed to delete size:", error);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[30%] h-[85%] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Quản lý kích cỡ</h2>

        <form className="mb-6" onSubmit={handleAddSize}>
          <ValidatedInput
            label="Kích cỡ"
            placeholder="Vui lòng nhập kích cỡ"
            schema={sizeSchema}
            value={newSize}
            onChange={setNewSize}
          />
          <div className="flex justify-between">
            <div></div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 "
            >
              Thêm
            </button>
          </div>
        </form>

        <TableOneColumn
          data={sizes}
          title="Kích cỡ"
          showDelete={true}
          onDelete={(id) => handleDeleteSize(id)}
        />
      </div>
    </div>
  );
});

export default Size;
