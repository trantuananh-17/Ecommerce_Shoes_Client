import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form
import TableOneColumn from "../../../components/admin/ui/table/TableOneColumn";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  addSizeAPI,
  deleteSizeAPI,
  fetchSizesAPI,
} from "../../../services/size.service";
import { usePagination } from "../../../hooks/usePagination";
import { sizeSchema } from "../../../validator/sizeSchema";

type SizeItem = {
  id: string;
  name: string;
};

type Props = {
  onClose: () => void;
};

const Size: React.FC<Props> = React.memo(({ onClose }) => {
  const [sizes, setSizes] = useState<SizeItem[]>([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 8);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      size: "",
    },
  });

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

  const validateSize = (value: string) => {
    const { error } = sizeSchema.validate(value);

    return error ? error.details[0].message : true;
  };

  const handleAddSize = async (data: { size: string }) => {
    try {
      const response = await addSizeAPI(data.size);

      if (response?.data) {
        reset();
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchSizes();
      } else {
        setToastMessage("Thêm kích cỡ thất bại.");
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
        className="relative bg-white p-6 rounded-xl shadow-lg w-[30%] h-[75%] z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý kích cỡ</h2>

        <div className="flex flex-col h-full">
          <form
            className="mb-2 flex items-end gap-4"
            onSubmit={handleSubmit(handleAddSize)}
          >
            <Controller
              name="size"
              control={control}
              rules={{
                validate: validateSize,
              }}
              render={({ field }) => (
                <ValidatedInput
                  {...field}
                  placeholder="Kích cỡ"
                  error={errors.size?.message}
                />
              )}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Thêm
            </button>
          </form>

          <div className="flex-1 overflow-y-auto">
            <TableOneColumn
              data={sizes}
              title="Kích cỡ"
              showDelete={true}
              onDelete={(id) => handleDeleteSize(id)}
            />
          </div>

          <div className="mb-10">
            <Pagination
              currentPage={pagination.page}
              totalItems={pagination.totalDocs}
              pageSize={pagination.limit}
              column={false}
              onPageChange={setPage}
            />
          </div>
        </div>

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Size;
