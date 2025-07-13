import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import {
  fetchColorsByAdminAPI,
  addColorAPI,
} from "../../../services/color.service";
import ValidatedInput from "../../../components/admin/ui/ValidatedInput";
import { colorEnSchema, colorViSchema } from "../../../validator/colorSchema";

const columns = [
  {
    label: "Tên màu sắc",
    accessor: (row: ColorItem) => row.name.vi,
  },
  {
    label: "Color name",
    accessor: (row: ColorItem) => row.name.en,
  },
];

type Props = {
  onClose: () => void;
};

type ColorItem = {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Color: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [newColorVi, setNewColorVi] = useState<string>("");
  const [newColorEn, setNewColorEn] = useState<string>("");
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 8);

  const fetchColors = useCallback(async () => {
    const response = await fetchColorsByAdminAPI(
      pagination.page,
      pagination.limit
    );

    if (response?.data) {
      setColors(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const handleAddColor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newColorVi || !newColorEn) {
      setToastMessage(
        "Vui lòng nhập cả tên màu sắc bằng tiếng Việt và tiếng Anh."
      );
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
      return;
    }

    try {
      const response = await addColorAPI({
        name: { vi: newColorVi, en: newColorEn },
      });

      if (response?.data) {
        setNewColorVi("");
        setNewColorEn("");
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchColors();

        setInputKey((prevKey) => prevKey + 1);
      } else {
        setToastMessage("Thêm màu sắc thất bại.");
        setToastError(true);
        setTimeout(() => setToastError(false), 3000);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setToastMessage(error.message);
        setToastError(true);
        setTimeout(() => setToastError(false), 3000);
      } else {
        setToastMessage("Đã xảy ra lỗi không xác định.");
        setToastError(true);
        setTimeout(() => setToastError(false), 3000);
      }
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[35%] h-[85%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý màu sắc</h2>

        <form className="mb-2 flex items-end gap-4" onSubmit={handleAddColor}>
          <ValidatedInput
            key={`color-vi-${inputKey}`}
            placeholder="Màu sắc "
            schema={colorViSchema}
            value={newColorVi}
            onChange={setNewColorVi}
          />

          <ValidatedInput
            key={`color-en-${inputKey}`}
            ref={inputRef}
            placeholder="Color Name "
            schema={colorEnSchema}
            value={newColorEn}
            onChange={setNewColorEn}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          >
            Thêm
          </button>
        </form>

        <div className="flex-1 overflow-y-auto">
          {" "}
          <TableManyColumn
            columns={columns}
            data={colors}
            showEdit
            // showToggle
            // toggleField="isActive"
            // onDelete={(id) => console.log("Delete", id)}
            // onToggle={(id, isActive) => console.log("Toggle", id, isActive)}
          />
        </div>

        <div className="mt-2">
          {" "}
          {/* Pagination luôn nằm dưới */}
          <Pagination
            currentPage={pagination.page}
            totalItems={pagination.totalDocs}
            pageSize={pagination.limit}
            column={true}
            onPageChange={setPage}
          />
        </div>

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Color;
