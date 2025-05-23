import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import { fetchColorAPI } from "../../../services/color.service";

const columns = [{ label: "Màu sắc", accessor: "name" }];

type Props = {
  onClose: () => void;
};

type ColorItem = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Color: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [categories, setCategories] = useState<ColorItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 4);

  const fetchColors = useCallback(async () => {
    const response = await fetchColorAPI(pagination.page, pagination.limit);

    if (response?.data) {
      setCategories(response.data.data);
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

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[60%] h-[75%] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý màu sắc</h2>

        <form
          className="mb-2 flex items-end gap-4 content-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Thêm
          </button>
        </form>

        <TableManyColumn
          columns={columns}
          data={categories}
          showEdit
          showDelete
          showToggle
          toggleField="isActive"
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => {}}
          onToggle={(id, isActive) => {}}
        />

        <Pagination
          currentPage={pagination.page}
          totalItems={pagination.totalDocs}
          pageSize={pagination.limit}
          column={true}
          onPageChange={setPage}
        />

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Color;
