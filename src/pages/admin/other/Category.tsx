import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  fetchCategoryAPI,
  addCategoryAPI,
  updateCategoryAPI,
} from "../../../services/category.service";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import {
  categoryEnSchema,
  categoryViSchema,
} from "../../../validator/categorySchema";
import { usePagination } from "../../../hooks/usePagination";

type CategoryItem = {
  id: string;
  name: { vi: string; en: string };
  slug: { vi: string; en: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  onClose: () => void;
};

const columns = [
  {
    label: "Tên danh mục",
    accessor: (row: CategoryItem) => row.name.vi,
  },
  {
    label: "Category Name",
    accessor: (row: CategoryItem) => row.name.en,
  },
];

const Category: React.FC<Props> = React.memo(({ onClose }) => {
  const { pagination, setPage, updatePagination } = usePagination(1, 7);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      categoryVi: "",
      categoryEn: "",
      isActive: true,
    },
  });

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

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

  const handleAddCategory = async (data: {
    categoryVi: string;
    categoryEn: string;
    isActive: boolean;
  }) => {
    try {
      let response;
      if (editingCategoryId) {
        response = await updateCategoryAPI(editingCategoryId, {
          name: { vi: data.categoryVi, en: data.categoryEn },
          isActive: data.isActive,
        });
      } else {
        response = await addCategoryAPI({
          name: { vi: data.categoryVi, en: data.categoryEn },
        });
      }

      if (response?.data || response || response.message) {
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchCategories();
        reset({ categoryVi: "", categoryEn: "", isActive: true });
        setEditingCategoryId(null);
      } else {
        setToastMessage("Thêm hoặc sửa danh mục thất bại.");
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
      reset({
        categoryVi: category.name.vi,
        categoryEn: category.name.en,
        isActive: category.isActive,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    reset({ categoryVi: "", categoryEn: "", isActive: true });
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50 w-full" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[45%] h-[75%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý danh mục</h2>

        <form
          className="mb-2 flex gap-4 flex-col"
          onSubmit={handleSubmit(handleAddCategory)}
        >
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-5 w-full">
              <Controller
                name="categoryVi"
                control={control}
                rules={{
                  validate: (value) =>
                    categoryViSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên danh mục (Tiếng Việt)"
                    error={errors.categoryVi?.message}
                  />
                )}
              />
              <Controller
                name="categoryEn"
                control={control}
                rules={{
                  validate: (value) =>
                    categoryEnSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên danh mục (Tiếng Anh)"
                    error={errors.categoryEn?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 ">
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
