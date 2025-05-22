import React, { useState, useEffect, useRef } from "react";
import TableOneColumn from "../../../components/admin/ui/TableOneColumn";
import { apiRequest } from "../../../api/apiRequest";
import axios from "axios";
import type { AxiosError } from "axios";
import { baseURL } from "../../../api/client";
import { sizeSchema } from "../../../validator/sizeSchema";
import ValidatedInput, {
  type ValidatedInputRef,
} from "../../../components/admin/ui/ValidatedInput";
import ToastSuccess from "../../../components/shared/ToastSuccess";
import ToastError from "../../../components/shared/ToastError";

type SizeItem = {
  id: string;
  name: string;
};

type SizeResponse = {
  message: string;
  data: SizeItem[];
};

type Props = {
  onClose: () => void;
};

const auth = axios.create({ baseURL: baseURL });

const Size: React.FC<Props> = React.memo(({ onClose }) => {
  const inputRef = useRef<ValidatedInputRef>(null);
  const [sizes, setSizes] = useState<SizeItem[]>([]);
  const [newSize, setNewSize] = useState<string>("");
  const [inputKey, setInputKey] = useState(0);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchSizes = async () => {
    try {
      const response = await apiRequest<SizeResponse>(
        auth.get("/sizes?page=1&limit=5", {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
      );

      if (response?.data) {
        setSizes(response.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleAddSize = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = inputRef.current?.validate();
    if (!isValid) return;

    try {
      const response = await auth.post("/sizes", {
        name: newSize.trim(),
      });

      if (response.data?.data) {
        setSizes((prev) => [...prev, response.data.data]);
        setNewSize("");
        setInputKey((k) => k + 1);
        setToastMessage(response.data.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
        await fetchSizes();
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message || "Đã xảy ra lỗi không xác định.";
      setToastMessage(errorMessage);
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const handleDeleteSize = async (id: string) => {
    try {
      const response = await auth.delete(`/sizes/${id}`);
      if (response.data) {
        setToastMessage(response.data.message);
        setToastSuccess(true);
        setTimeout(() => setToastSuccess(false), 3000);
      }
      await fetchSizes();
    } catch (error) {
      console.error("Failed to delete size:", error);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div
        className="relative bg-white p-6 rounded-xl shadow-lg w-[30%] h-[75%] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Quản lý kích cỡ</h2>

        <form className="mb-6" onSubmit={handleAddSize}>
          <ValidatedInput
            key={`size-${inputKey}`}
            ref={inputRef}
            label="Kích cỡ"
            placeholder="Vui lòng nhập kích cỡ"
            schema={sizeSchema}
            value={newSize}
            onChange={setNewSize}
          />
          <button
            type="submit"
            className="bg-blue-500  text-white px-4 py-2 rounded mt-4 "
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

        {toastSuccess && <ToastSuccess message={toastMessage} />}
        {toastError && <ToastError message={toastMessage} />}
      </div>
    </div>
  );
});

export default Size;
