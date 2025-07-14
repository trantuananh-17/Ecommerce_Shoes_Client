import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  fetchClosureByAdminAPI,
  addClosureAPI,
  updateClosureAPI,
} from "../../../services/closure.service";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import {
  closureEnSchema,
  closureViSchema,
  descriptionEnSchema,
  descriptionViSchema,
} from "../../../validator/closureSchema";
import ValidatedAria from "../../../components/admin/ui/input/ValidatedAria";
import { usePagination } from "../../../hooks/usePagination";

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

const Closure: React.FC<Props> = React.memo(({ onClose }) => {
  const { pagination, setPage, updatePagination } = usePagination(1, 5);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      closureVi: "",
      closureEn: "",
      descriptionVi: "",
      descriptionEn: "",
    },
  });

  const [closures, setClosures] = useState<ClosureItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingClosureId, setEditingClosureId] = useState<string | null>(null);

  const fetchClosures = useCallback(async () => {
    const response = await fetchClosureByAdminAPI(
      pagination.page,
      pagination.limit
    );

    if (response?.data) {
      setClosures(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  useEffect(() => {
    fetchClosures();
  }, [fetchClosures]);

  const handleAddClosure = async (data: {
    closureVi: string;
    closureEn: string;
    descriptionVi: string;
    descriptionEn: string;
  }) => {
    try {
      let response;
      if (editingClosureId) {
        response = await updateClosureAPI(editingClosureId, {
          name: { vi: data.closureVi, en: data.closureEn },
          description: { vi: data.descriptionVi, en: data.descriptionEn },
        });
      } else {
        response = await addClosureAPI({
          name: { vi: data.closureVi, en: data.closureEn },
          description: { vi: data.descriptionVi, en: data.descriptionEn },
        });
      }

      if (response?.data || response.message) {
        reset({
          closureVi: "",
          closureEn: "",
          descriptionVi: "",
          descriptionEn: "",
        });
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchClosures();
        setEditingClosureId(null);
      } else {
        setToastMessage("Thêm hoặc sửa kiểu buộc dây thất bại.");
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
    const closure = closures.find((cl) => cl.id === id);
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
    reset({
      closureVi: "",
      closureEn: "",
      descriptionVi: "",
      descriptionEn: "",
    });
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
          <div className="w-[80%]">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-5 w-full">
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
                      descriptionViSchema.validate(value).error?.message ||
                      true,
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
                      descriptionEnSchema.validate(value).error?.message ||
                      true,
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
          </div>

          <div className="flex gap-2 flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              {editingClosureId ? "Sửa" : "Thêm"}
            </button>

            {editingClosureId && (
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
            data={closures}
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

export default Closure;
