import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import Pagination from "../../../components/admin/ui/Pagination";
import {
  fetchColorsByAdminAPI,
  addColorAPI,
} from "../../../services/color.service";
import ValidatedInput from "../../../components/admin/ui/input/ValidatedInput";
import { colorEnSchema, colorViSchema } from "../../../validator/colorSchema";
import { usePagination } from "../../../hooks/usePagination";

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

const Color: React.FC<Props> = React.memo(({ onClose }) => {
  const [colors, setColors] = useState<ColorItem[]>([]);
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
      colorVi: "",
      colorEn: "",
    },
  });

  const fetchColors = useCallback(async () => {
    const response = await fetchColorsByAdminAPI(
      pagination.page,
      pagination.limit
    );

    if (response?.data) {
      setColors(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const handleAddColor = async (data: { colorVi: string; colorEn: string }) => {
    try {
      const response = await addColorAPI({
        name: { vi: data.colorVi, en: data.colorEn },
      });

      if (response?.data) {
        reset();
        setToastMessage(response.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchColors();
      } else {
        setToastMessage("Thêm màu sắc thất bại.");
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

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[35%] h-[85%] z-10 flex flex-col"
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
          <TableManyColumn columns={columns} data={colors} />
        </div>

        <div className="mt-2">
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

export default Color;
