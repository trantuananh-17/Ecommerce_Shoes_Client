import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import {
  categoryEnSchema,
  categoryViSchema,
} from "../../../validator/categorySchema";
import {
  addCategoryAPI,
  fetchCategoryAPI,
  updateCategoryAPI,
} from "../../../services/category.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    totalDocs: 0,
    totalPages: 0,
  });

  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

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

  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["categories", pagination.page, pagination.limit],
    queryFn: () => fetchCategoryAPI(pagination.page, pagination.limit),
    staleTime: 5 * 60 * 1000,
  });

  const addCategory = useMutation({
    mutationFn: (data: { name: { vi: string; en: string } }) =>
      addCategoryAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name: { vi: string; en: string }; isActive: boolean };
    }) => updateCategoryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const categories = data?.data?.data || [];
  const paginationData = data?.data;

  useEffect(() => {
    if (paginationData) {
      setPagination((prev) => ({
        ...prev,
        totalDocs: paginationData.totalDocs,
        totalPages: paginationData.totalPages,
        page: paginationData.currentPage,
      }));
    }
  }, [paginationData]);

  const handleAddCategory = async (data: {
    categoryVi: string;
    categoryEn: string;
    isActive: boolean;
  }) => {
    try {
      if (editingCategoryId) {
        await updateCategory.mutateAsync({
          id: editingCategoryId,
          data: {
            name: { vi: data.categoryVi, en: data.categoryEn },
            isActive: data.isActive,
          },
        });
        setToastMessage("Sửa danh mục thành công");
      } else {
        await addCategory.mutateAsync({
          name: { vi: data.categoryVi, en: data.categoryEn },
        });
        setToastMessage("Thêm danh mục thành công");
      }
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      reset({ categoryVi: "", categoryEn: "", isActive: true });
      setEditingCategoryId(null);
    } catch (err: unknown) {
      const error = err as Error;
      setToastMessage(error.message || "Có lỗi xảy ra.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const handleEdit = (id: string) => {
    const category = categories.find((cat: CategoryItem) => cat.id === id);
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

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50 w-full" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[45%] h-[90%] z-10 flex flex-col"
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
          {isPending ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải dữ liệu</p>
          ) : (
            <TableManyColumn
              columns={columns}
              data={categories}
              showEdit
              onEdit={handleEdit}
            />
          )}
        </div>

        <div className="mt-4">
          <Pagination
            currentPage={pagination.page}
            totalItems={pagination.totalDocs}
            pageSize={pagination.limit}
            column={true}
            onPageChange={handlePageChange}
          />
        </div>

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Category;
