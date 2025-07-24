import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TableOneColumn from "../../../components/admin/ui/table/TableOneColumn";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import Pagination from "../../../components/admin/ui/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { sizeSchema } from "../../../validator/sizeSchema";
import { useSizes } from "../../../hooks/tanstack/size/useSize";

type Props = {
  onClose: () => void;
};

const Size: React.FC<Props> = React.memo(({ onClose }) => {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { pagination, setPage, updatePagination } = usePagination(1, 5);

  const { sizes, paginationData, isPending, error, addSize } = useSizes(
    pagination.page,
    pagination.limit
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ size: string }>({
    defaultValues: { size: "" },
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

  const validateSize = (value: string) => {
    const { error } = sizeSchema.validate(value);
    return error ? error.details[0].message : true;
  };

  const onSubmit = async (formData: { size: string }) => {
    try {
      const response = await addSize.mutateAsync(formData.size);
      setToastMessage(response?.message || "Thêm kích cỡ thành công");
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      reset();
    } catch (err: unknown) {
      const error = err as Error;
      setToastMessage(error.message || "Thêm kích cỡ thất bại");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-6 rounded-xl shadow-lg w-[30%] h-[85%] z-10 flex flex-col"
      >
        <h2 className="text-xl font-bold mb-3">Quản lý kích cỡ</h2>

        <form
          className="mb-2 flex items-end gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="size"
            control={control}
            rules={{ validate: validateSize }}
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
          {isPending ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải dữ liệu</p>
          ) : (
            <TableOneColumn data={sizes} title="Kích cỡ" />
          )}
        </div>

        <div className="mt-4">
          <Pagination
            currentPage={pagination.page}
            totalItems={pagination.totalDocs}
            pageSize={pagination.limit}
            column={false}
            onPageChange={setPage}
          />
        </div>

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Size;
