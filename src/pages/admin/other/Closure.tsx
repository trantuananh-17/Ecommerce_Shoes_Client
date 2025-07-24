import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import ValidatedAria from "../../../components/admin/ui/input/ValidatedAria";
import {
  closureEnSchema,
  closureViSchema,
  descriptionEnSchema,
  descriptionViSchema,
} from "../../../validator/closureSchema";
import { usePagination } from "../../../hooks/usePagination";
import { useClosures } from "../../../hooks/tanstack/closure/useClosures";

type Props = {
  onClose: () => void;
};

type ClosureItem = {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type FormValues = {
  closureVi: string;
  closureEn: string;
  descriptionVi: string;
  descriptionEn: string;
};

const columns = [
  {
    label: "Tên kiểu buộc dây",
    accessor: (row: ClosureItem) => row.name.vi,
  },
  {
    label: "Closure Name",
    accessor: (row: ClosureItem) => row.name.en,
  },
];

const Closure: React.FC<Props> = React.memo(({ onClose }) => {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingClosureId, setEditingClosureId] = useState<string | null>(null);

  const { pagination, setPage, updatePagination } = usePagination(1, 5);

  const {
    closures,
    paginationData,
    isPending,
    error,
    addClosure,
    updateClosure,
  } = useClosures(pagination.page, pagination.limit);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      closureVi: "",
      closureEn: "",
      descriptionVi: "",
      descriptionEn: "",
    },
  });

  useEffect(() => {
    if (paginationData) {
      updatePagination({
        totalDocs: paginationData.totalDocs,
        totalPages: paginationData.totalPages,
        currentPage: paginationData.currentPage,
        limit: paginationData.limit,
      });
    }
  }, [paginationData, updatePagination]);

  const handleAddClosure = async (formData: FormValues) => {
    const payload = {
      name: {
        vi: formData.closureVi,
        en: formData.closureEn,
      },
      description: {
        vi: formData.descriptionVi,
        en: formData.descriptionEn,
      },
    };

    try {
      const response = editingClosureId
        ? await updateClosure.mutateAsync({ id: editingClosureId, payload })
        : await addClosure.mutateAsync(payload);

      setToastMessage(response?.message || "Thao tác thành công");
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      reset();
      setEditingClosureId(null);
    } catch (error: unknown) {
      const err = error as Error;
      setToastMessage(err.message || "Thêm/sửa thất bại");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const handleEdit = (id: string) => {
    const closure = closures.find((c: ClosureItem) => c.id === id);
    if (closure) {
      setEditingClosureId(closure.id);
      reset({
        closureVi: closure.name.vi,
        closureEn: closure.name.en,
        descriptionVi: closure.description.vi,
        descriptionEn: closure.description.en,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingClosureId(null);
    reset();
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[45%] h-[90%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý kiểu buộc dây</h2>

        <form
          className="flex items-end justify-between mb-4 gap-2"
          onSubmit={handleSubmit(handleAddClosure)}
        >
          <div className="w-[80%] flex flex-col gap-5">
            <div className="flex gap-5">
              <Controller
                name="closureVi"
                control={control}
                rules={{
                  validate: (value) =>
                    closureViSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên kiểu buộc dây (Tiếng Việt)"
                    error={errors.closureVi?.message}
                  />
                )}
              />
              <Controller
                name="closureEn"
                control={control}
                rules={{
                  validate: (value) =>
                    closureEnSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên kiểu buộc dây (Tiếng Anh)"
                    error={errors.closureEn?.message}
                  />
                )}
              />
            </div>
            <div className="flex gap-5">
              <Controller
                name="descriptionVi"
                control={control}
                rules={{
                  validate: (value) =>
                    descriptionViSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedAria
                    {...field}
                    placeholder="Mô tả (Tiếng Việt)"
                    error={errors.descriptionVi?.message}
                    row={3}
                  />
                )}
              />
              <Controller
                name="descriptionEn"
                control={control}
                rules={{
                  validate: (value) =>
                    descriptionEnSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedAria
                    {...field}
                    placeholder="Mô tả (Tiếng Anh)"
                    error={errors.descriptionEn?.message}
                    row={3}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editingClosureId ? "Sửa" : "Thêm"}
            </button>
            {editingClosureId && (
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
              data={closures}
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
            onPageChange={setPage}
          />
        </div>

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Closure;
