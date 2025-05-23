import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import { fetchCategoryAPI } from "../../../services/category.service";

type Props = {
  onClose: () => void;
};

const column = [
  {
    label: "Tên danh mục",
    accessor: "name",
  },
  {
    label: "Slug",
    accessor: "slug",
  },
];

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Category: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 4);

  const fetchCategories = useCallback(async () => {
    const response = await fetchCategoryAPI(pagination.page, pagination.limit);

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
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <div
        className="absolute inset-0  z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black opacity-50" />

        <div
          className="relative bg-white p-6 rounded-xl shadow-lg w-[60%] h-[75%] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-3">Quản lý kích cỡ</h2>

          <form
            className="mb-2 flex items-end gap-4 content-center"
            onSubmit={() => {}}
          >
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded "
            >
              Thêm
            </button>
          </form>

          <TableManyColumn
            columns={column}
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
    </>
  );
});

export default Category;
