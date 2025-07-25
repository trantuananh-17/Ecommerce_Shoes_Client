import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import ValidatedAria from "../../../components/admin/ui/input/ValidatedAria";
import {
  descriptionEnSchema,
  descriptionViSchema,
  materialEnSchema,
  materialViSchema,
} from "../../../validator/materialSchema";
import { usePagination } from "../../../hooks/usePagination";
import {
  addMaterialAPI,
  updateMaterialAPI,
  fetchMaterialsByAdminAPI,
} from "../../../services/material.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type MaterialItem = {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type Props = {
  onClose: () => void;
};

type FormValues = {
  materialVi: string;
  materialEn: string;
  descriptionVi: string;
  descriptionEn: string;
};

const columns = [
  {
    label: "Tên vật liệu",
    accessor: (row: MaterialItem) => row.name.vi,
  },
  {
    label: "Material Name",
    accessor: (row: MaterialItem) => row.name.en,
  },
];

const Material: React.FC<Props> = React.memo(({ onClose }) => {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(
    null
  );

  const { pagination, setPage, updatePagination } = usePagination(1, 5);
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["materials", pagination.page],
    queryFn: () => fetchMaterialsByAdminAPI(pagination.page, pagination.limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addMaterial = useMutation({
    mutationFn: (payload: {
      name: { vi: string; en: string };
      description: { vi: string; en: string };
    }) => addMaterialAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  const updateMaterial = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        name: { vi: string; en: string };
        description: { vi: string; en: string };
      };
    }) => updateMaterialAPI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  const materials = data?.data?.data || [];
  const paginationData = data?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      materialVi: "",
      materialEn: "",
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

  const handleAddOrUpdateMaterial = async (formData: FormValues) => {
    const payload = {
      name: {
        vi: formData.materialVi,
        en: formData.materialEn,
      },
      description: {
        vi: formData.descriptionVi,
        en: formData.descriptionEn,
      },
    };

    try {
      const response = editingMaterialId
        ? await updateMaterial.mutateAsync({ id: editingMaterialId, payload })
        : await addMaterial.mutateAsync(payload);

      setToastMessage(response?.message || "Thao tác thành công");
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      reset();
      setEditingMaterialId(null);
    } catch (error: unknown) {
      const err = error as Error;
      setToastMessage(err.message || "Thao tác thất bại");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const handleEdit = (id: string) => {
    const material = materials.find((m: MaterialItem) => m.id === id);
    if (material) {
      setEditingMaterialId(id);
      reset({
        materialVi: material.name.vi,
        materialEn: material.name.en,
        descriptionVi: material.description.vi,
        descriptionEn: material.description.en,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingMaterialId(null);
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
        <h2 className="text-xl font-bold mb-3">Quản lý vật liệu</h2>

        <form
          className="flex items-end justify-between mb-4"
          onSubmit={handleSubmit(handleAddOrUpdateMaterial)}
        >
          <div className="w-[80%] flex flex-col gap-5">
            <div className="flex gap-5">
              <Controller
                name="materialVi"
                control={control}
                rules={{
                  validate: (value) =>
                    materialViSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên vật liệu (Tiếng Việt)"
                    error={errors.materialVi?.message}
                  />
                )}
              />
              <Controller
                name="materialEn"
                control={control}
                rules={{
                  validate: (value) =>
                    materialEnSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Tên vật liệu (Tiếng Anh)"
                    error={errors.materialEn?.message}
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
              {editingMaterialId ? "Sửa" : "Thêm"}
            </button>
            {editingMaterialId && (
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
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải vật liệu</p>
          ) : (
            <TableManyColumn
              columns={columns}
              data={materials}
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

export default Material;
