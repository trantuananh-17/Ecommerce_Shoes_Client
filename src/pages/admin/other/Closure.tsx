import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ValidatedInputRef } from "../../../components/admin/ui/ValidatedInput";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../../components/admin/ui/Pagination";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/TableManyColumn";
import {
  fetchClosureByAdminAPI,
  addClosureAPI,
  updateClosureAPI,
} from "../../../services/closure.service";
import ValidatedInput from "../../../components/admin/ui/ValidatedInput";
import {
  closureEnSchema,
  closureViSchema,
  descriptionEnSchema,
  descriptionViSchema,
} from "../../../validator/closureSchema";
import ValidatedAria from "../../../components/admin/ui/ValidatedAria";

type Props = {
  onClose: () => void;
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

type ClosureItem = {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

const Closure: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [inputKey, setInputKey] = useState(0);
  const [closures, setClosures] = useState<ClosureItem[]>([]);
  const [newClosureVi, setNewClosureVi] = useState<string>("");
  const [newClosureEn, setNewClosureEn] = useState<string>("");
  const [newDescriptionVi, setNewDescriptionVi] = useState<string>("");
  const [newDescriptionEn, setNewDescriptionEn] = useState<string>("");
  const [editingClosureId, setEditingClosureId] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 5);

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

  const handleAddClosure = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = inputRef.current?.validate();
    if (!isValid) return;

    if (
      !newClosureVi ||
      !newClosureEn ||
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

      if (editingClosureId) {
        response = await updateClosureAPI(editingClosureId, {
          name: { vi: newClosureVi, en: newClosureEn },
          description: { vi: newDescriptionVi, en: newDescriptionEn },
        });
      } else {
        response = await addClosureAPI({
          name: { vi: newClosureVi, en: newClosureEn },
          description: { vi: newDescriptionVi, en: newDescriptionEn },
        });
      }

      if (response?.data || response.message) {
        setNewClosureVi("");
        setNewClosureEn("");
        setNewDescriptionVi("");
        setNewDescriptionEn("");
        setInputKey((prevKey) => prevKey + 1);
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
      setNewClosureVi(closure.name.vi);
      setNewClosureEn(closure.name.en);
      setNewDescriptionVi(closure.description.vi);
      setNewDescriptionEn(closure.description.en);
    }
  };

  const handleCancelEdit = () => {
    setEditingClosureId(null);
    setNewClosureVi("");
    setNewClosureEn("");
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
        <h2 className="text-xl font-bold mb-3">Quản lý kiểu buộc dây</h2>

        <form
          className=" flex items-end justify-between "
          onSubmit={handleAddClosure}
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <ValidatedInput
                key={`closure-vi-${inputKey}`}
                ref={inputRef}
                placeholder="Tên kiểu buộc dây (Tiếng Việt)"
                schema={closureViSchema}
                value={newClosureVi}
                onChange={setNewClosureVi}
              />

              <ValidatedInput
                key={`closure-en-${inputKey}`}
                ref={inputRef}
                placeholder="Tên kiểu buộc dây (Tiếng Anh)"
                schema={closureEnSchema}
                value={newClosureEn}
                onChange={setNewClosureEn}
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
