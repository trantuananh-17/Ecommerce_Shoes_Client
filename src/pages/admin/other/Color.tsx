import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import { colorEnSchema, colorViSchema } from "../../../validator/colorSchema";
import { usePagination } from "../../../hooks/usePagination";
import {
  addColorAPI,
  fetchColorsByAdminAPI,
} from "../../../services/color.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onClose: () => void;
};

type ColorItem = {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormValues = {
  colorVi: string;
  colorEn: string;
};

const columns = [
  {
    label: "Tên màu sắc",
    accessor: (row: ColorItem) => row.name.vi,
  },
  {
    label: "Color name",
    accessor: (row: ColorItem) => row.name.en,
  },
];

const Color: React.FC<Props> = React.memo(({ onClose }) => {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { pagination, setPage, updatePagination } = usePagination(1, 6);
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["colors", pagination.page],
    queryFn: () => fetchColorsByAdminAPI(pagination.page, pagination.limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addColor = useMutation({
    mutationFn: (payload: {
      name: {
        vi: string;
        en: string;
      };
    }) => addColorAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });

  const colors = data?.data?.data || [];
  const paginationData = data?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      colorVi: "",
      colorEn: "",
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

  const handleAddColor = async (formData: FormValues) => {
    try {
      const response = await addColor.mutateAsync({
        name: {
          vi: formData.colorVi,
          en: formData.colorEn,
        },
      });

      reset();
      setToastMessage(response.message || "Thêm màu sắc thành công");
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
    } catch (error: unknown) {
      const err = error as Error;
      setToastMessage(err.message || "Thêm màu sắc thất bại");
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
        className="relative bg-white p-6 rounded-xl shadow-lg w-[35%] h-[90%] z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Quản lý màu sắc</h2>

        <form
          className="mb-2 flex items-end gap-4"
          onSubmit={handleSubmit(handleAddColor)}
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <Controller
                name="colorVi"
                control={control}
                rules={{
                  validate: (value) =>
                    colorViSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Màu sắc (Tiếng Việt)"
                    error={errors.colorVi?.message}
                  />
                )}
              />
              <Controller
                name="colorEn"
                control={control}
                rules={{
                  validate: (value) =>
                    colorEnSchema.validate(value).error?.message || true,
                }}
                render={({ field }) => (
                  <ValidatedInput
                    {...field}
                    placeholder="Color Name (Tiếng Anh)"
                    error={errors.colorEn?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
            >
              Thêm
            </button>
          </div>
        </form>

        <div className="flex-1 overflow-y-auto">
          {isPending ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải màu sắc</p>
          ) : (
            <TableManyColumn columns={columns} data={colors} />
          )}
        </div>

        <div className="mt-2">
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

export default Color;
