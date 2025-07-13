import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import {
  fetchCategoryAPI,
  addCategoryAPI,
  updateCategoryAPI,
} from "../../../services/category.service";
import ValidatedInput from "../../../components/admin/ui/ValidatedInput";
import {
  categoryEnSchema,
  categoryViSchema,
} from "../../../validator/categorySchema";

type Props = {
  onClose: () => void;
};

const columns = [
  {
    label: "Tên danh mục ",
    accessor: (row: CategoryItem) => row.name.vi,
  },
  {
    label: "Category Name",
    accessor: (row: CategoryItem) => row.name.en,
  },
];

type CategoryItem = {
  id: string;
  name: { vi: string; en: string };
  slug: { vi: string; en: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Category: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategoryVi, setNewCategoryVi] = useState<string>("");
  const [newCategoryEn, setNewCategoryEn] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 7);
  const [isActive, setIsActive] = useState<boolean>(true);

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

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = inputRef.current?.validate();
    if (!isValid) return;

    if (!newCategoryVi || !newCategoryEn) {
      setToastMessage("Vui lòng nhập đầy đủ tất cả các trường.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
      return;
    }

    try {
      let response;

      if (editingCategoryId) {
        response = await updateCategoryAPI(editingCategoryId, {
          name: { vi: newCategoryVi, en: newCategoryEn },
          isActive: isActive,
        });
      } else {
        response = await addCategoryAPI({
          name: { vi: newCategoryVi, en: newCategoryEn },
        });
      }

      if (response?.data || response.message) {
        setNewCategoryVi("");
        setNewCategoryEn("");
        setInputKey((prevKey) => prevKey + 1);
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchCategories();
        setEditingCategoryId(null);
        setIsActive(true);
      } else {
        setToastMessage("Thêm danh mục thất bại.");
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

  const handleEdit = (id: string) => {
    const category = categories.find((cat) => cat.id === id);

    if (category) {
      setEditingCategoryId(category.id);
      setNewCategoryVi(category.name.vi);
      setNewCategoryEn(category.name.en);
      setIsActive(category.isActive);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setNewCategoryVi("");
    setNewCategoryEn("");
    setIsActive(true);
    setInputKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[35%] h-[75%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý danh mục</h2>

        <form
          className="mb-2 flex items-end gap-4"
          onSubmit={handleAddCategory}
        >
          <ValidatedInput
            key={`category-vi-${inputKey}`}
            ref={inputRef}
            placeholder="Tên danh mục (Tiếng Việt)"
            schema={categoryViSchema}
            value={newCategoryVi}
            onChange={setNewCategoryVi}
          />

          <ValidatedInput
            key={`category-en-${inputKey}`}
            ref={inputRef}
            placeholder="Tên danh mục (Tiếng Anh)"
            schema={categoryEnSchema}
            value={newCategoryEn}
            onChange={setNewCategoryEn}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              {editingCategoryId ? "Sửa" : "Thêm"}
            </button>

            {editingCategoryId && (
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={handleCancelEdit}
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        <div className="flex-1 overflow-y-auto">
          <TableManyColumn
            columns={columns}
            data={categories}
            showEdit
            showToggle
            toggleField="isActive"
            onEdit={handleEdit}
          />
        </div>

        <div className="mt-4">
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

export default Category;
