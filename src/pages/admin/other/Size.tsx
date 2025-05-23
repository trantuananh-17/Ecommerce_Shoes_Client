import React, { useState, useEffect, useRef, useCallback } from "react";
import TableOneColumn from "../../../components/admin/ui/TableOneColumn";
import { sizeSchema } from "../../../validator/sizeSchema";
import ValidatedInput, {
  type ValidatedInputRef,
} from "../../../components/admin/ui/ValidatedInput";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  addSizeAPI,
  deleteSizeAPI,
  fetchSizesAPI,
} from "../../../services/size.service";
import { usePagination } from "../../../hooks/usePagination";

type SizeItem = {
  id: string;
  name: string;
};

type Props = {
  onClose: () => void;
};

const Size: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [sizes, setSizes] = useState<SizeItem[]>([]);
  const [newSize, setNewSize] = useState<string>("");
  const [inputKey, setInputKey] = useState(0);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 6);

  const fetchSizes = useCallback(async () => {
    const response = await fetchSizesAPI(pagination.page);
    if (response?.data) {
      setSizes(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, updatePagination]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  const handleAddSize = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = inputRef.current?.validate();
    if (!isValid) return;

    const response = await addSizeAPI(newSize);
    if (response?.data) {
      setNewSize("");
      setInputKey((k) => k + 1);
      setToastMessage(response.message);
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      await fetchSizes();
    } else {
      setToastMessage("Thêm kích cỡ thất bại.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const handleDeleteSize = async (id: string) => {
    const response = await deleteSizeAPI(id);
    if (response) {
      setToastMessage(response.message);
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      await fetchSizes();
    } else {
      setToastMessage("Xóa kích cỡ thất bại.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[40%] h-[80%] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý kích cỡ</h2>

        <form
          className="mb-2 flex items-end gap-4 content-center"
          onSubmit={handleAddSize}
        >
          <ValidatedInput
            key={`size-${inputKey}`}
            ref={inputRef}
            placeholder="Kích cỡ"
            schema={sizeSchema}
            value={newSize}
            onChange={setNewSize}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded "
          >
            Thêm
          </button>
        </form>

        <TableOneColumn
          data={sizes}
          title="Kích cỡ"
          showDelete={true}
          onDelete={(id) => handleDeleteSize(id)}
        />

        <Pagination
          currentPage={pagination.page}
          totalItems={pagination.totalDocs}
          pageSize={pagination.limit}
          column={false}
          onPageChange={setPage}
        />

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Size;
