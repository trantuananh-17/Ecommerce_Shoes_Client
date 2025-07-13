import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import {
  fetchMaterialsByAdminAPI,
  addMaterialAPI,
  updateMaterialAPI,
} from "../../../services/material.service";
import ValidatedInput from "../../../components/admin/ui/ValidatedInput";

import ValidatedAria from "../../../components/admin/ui/ValidatedAria";
import {
  descriptionEnSchema,
  descriptionViSchema,
  materialEnSchema,
  materialViSchema,
} from "../../../validator/materialSchema";

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

type MaterialItem = {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

const Material: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [newMaterialVi, setNewMaterialVi] = useState<string>("");
  const [newMaterialEn, setNewMaterialEn] = useState<string>("");
  const [newDescriptionVi, setNewDescriptionVi] = useState<string>("");
  const [newDescriptionEn, setNewDescriptionEn] = useState<string>("");
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(
    null
  );
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 5);

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

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = inputRef.current?.validate();
    if (!isValid) return;

    if (
      !newMaterialVi ||
      !newMaterialEn ||
      !newDescriptionVi ||
      !newDescriptionEn
    ) {
      setToastMessage("Vui lòng nhập đầy đủ tất cả các trường.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
      return;
    }

    try {
      let response;

      if (editingMaterialId) {
        response = await updateMaterialAPI(editingMaterialId, {
          name: { vi: newMaterialVi, en: newMaterialEn },
          description: { vi: newDescriptionVi, en: newDescriptionEn },
        });
      } else {
        response = await addMaterialAPI({
          name: { vi: newMaterialVi, en: newMaterialEn },
          description: { vi: newDescriptionVi, en: newDescriptionEn },
        });
      }

      if (response?.data || response.message) {
        console.log(response);

        setNewMaterialVi("");
        setNewMaterialEn("");
        setNewDescriptionVi("");
        setNewDescriptionEn("");
        setInputKey((prevKey) => prevKey + 1);
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
      setNewMaterialVi(material.name.vi);
      setNewMaterialEn(material.name.en);
      setNewDescriptionVi(material.description.vi);
      setNewDescriptionEn(material.description.en);
    }
  };

  const handleCancelEdit = () => {
    setEditingMaterialId(null);
    setNewMaterialVi("");
    setNewMaterialEn("");
    setNewDescriptionVi("");
    setNewDescriptionEn("");
    setInputKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[30%] h-[75%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý vật liệu</h2>

        <form
          className="flex items-end justify-between"
          onSubmit={handleAddMaterial}
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <ValidatedInput
                key={`material-vi-${inputKey}`}
                ref={inputRef}
                placeholder="Tên vật liệu (Tiếng Việt)"
                schema={materialViSchema}
                value={newMaterialVi}
                onChange={setNewMaterialVi}
              />

              <ValidatedInput
                key={`material-en-${inputKey}`}
                ref={inputRef}
                placeholder="Tên vật liệu (Tiếng Anh)"
                schema={materialEnSchema}
                value={newMaterialEn}
                onChange={setNewMaterialEn}
              />
            </div>

            <div className="flex gap-5">
              <ValidatedAria
                key={`description-vi-${inputKey}`}
                ref={inputRef}
                placeholder="Mô tả (Tiếng Việt)"
                schema={descriptionViSchema}
                value={newDescriptionVi}
                onChange={setNewDescriptionVi}
                row={3}
              />

              <ValidatedAria
                key={`description-en-${inputKey}`}
                ref={inputRef}
                placeholder="Mô tả (Tiếng Anh)"
                schema={descriptionEnSchema}
                value={newDescriptionEn}
                onChange={setNewDescriptionEn}
                row={3}
              />
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
