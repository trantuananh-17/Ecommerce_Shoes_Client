import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  fetchMaterialsByAdminAPI,
  addMaterialAPI,
  updateMaterialAPI,
} from "../../../services/material.service";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import ValidatedAria from "../../../components/admin/ui/input/ValidatedAria";
import {
  descriptionEnSchema,
  descriptionViSchema,
  materialEnSchema,
  materialViSchema,
} from "../../../validator/materialSchema";
import { usePagination } from "../../../hooks/usePagination";

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
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(
    null
  );

  const { pagination, setPage, updatePagination } = usePagination(1, 5);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      materialVi: "",
      materialEn: "",
      descriptionVi: "",
      descriptionEn: "",
    },
  });

  const fetchMaterials = useCallback(async () => {
    const response = await fetchMaterialsByAdminAPI(
      pagination.page,
      pagination.limit
    );
    if (response?.data) {
      setMaterials(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleAddMaterial = async (data: {
    materialVi: string;
    materialEn: string;
    descriptionVi: string;
    descriptionEn: string;
  }) => {
    try {
      let response;

      if (editingMaterialId) {
        response = await updateMaterialAPI(editingMaterialId, {
          name: { vi: data.materialVi, en: data.materialEn },
          description: { vi: data.descriptionVi, en: data.descriptionEn },
        });
      } else {
        response = await addMaterialAPI({
          name: { vi: data.materialVi, en: data.materialEn },
          description: { vi: data.descriptionVi, en: data.descriptionEn },
        });
      }

      if (response?.data || response.message) {
        reset({
          materialVi: "",
          materialEn: "",
          descriptionVi: "",
          descriptionEn: "",
        });
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchMaterials();
        setEditingMaterialId(null);
      } else {
        setToastMessage("Thêm hoặc sửa vật liệu thất bại.");
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
    const material = materials.find((m) => m.id === id);

    if (material) {
      setEditingMaterialId(material.id);
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
    reset({
      materialVi: "",
      materialEn: "",
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
        <h2 className="text-xl font-bold mb-3">Quản lý vật liệu</h2>

        <form
          className="flex items-end justify-between mb-4"
          onSubmit={handleSubmit(handleAddMaterial)}
        >
          <div className="w-[80%]">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-5 w-full">
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
              {editingMaterialId ? "Sửa" : "Thêm"}
            </button>

            {editingMaterialId && (
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
            data={materials}
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

export default Material;
