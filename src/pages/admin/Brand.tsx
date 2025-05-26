import Pagination from "../../components/admin/ui/Pagination";
import { CirclePlus } from "lucide-react";
import ButtonForm from "../../components/admin/ui/ButtonForm";
import SearchInput from "../../components/admin/ui/SearchInput";
import TableManyColumn from "../../components/admin/ui/TableManyColumn";
import { usePagination } from "../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";
import {
  deleteBrandAPI,
  fetchBrandAPI,
  updateActiveBrandAPI,
} from "../../services/brand.service";
import ToastSuccess from "../../components/shared/ToastSuccess";
import ToastError from "../../components/shared/ToastError";

const column = [
  {
    label: "Tên thương hiệu",
    accessor: "name",
  },
  {
    label: "Quốc gia",
    accessor: "country",
  },
  {
    label: "Website",
    accessor: "websiteUrl",
  },
];

type BrandItem = {
  id: string;
  name: string;
  country: string;
  websiteUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Brand = () => {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const { pagination, setPage, updatePagination } = usePagination(1, 7);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onToggle = async (id: string, isActive: boolean) => {
    const response = await updateActiveBrandAPI(id, !isActive);
    console.log(isActive);

    if (response?.status_code === 200 || response?.status_code === 201) {
      setToastMessage(response.message);
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      await fetchBrands();
    }
  };

  const onDelete = async (id: string) => {
    const response = await deleteBrandAPI(id);
    if (response) {
      setToastMessage(response.message);
      setToastSuccess(true);
      setTimeout(() => setToastSuccess(false), 3000);
      await fetchBrands();
    } else {
      setToastMessage("Xóa thương hiệu thất bại.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const fetchBrands = useCallback(async () => {
    const response = await fetchBrandAPI(
      pagination.page,
      pagination.limit,
      searchQuery
    );

    if (response?.data) {
      setBrands(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, searchQuery, updatePagination]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div>
      <div className="bg-white w-full h-full p-5">
        <div className="flex justify-between">
          <SearchInput
            value={inputQuery}
            onChange={setInputQuery}
            onSearch={() => setSearchQuery(inputQuery)}
          />

          <ButtonForm
            name="Thêm thương hiệu"
            onClick={() => {
              console.log("hello brand");
            }}
            icon={CirclePlus}
          />
        </div>

        <TableManyColumn
          columns={column}
          data={brands}
          showEdit
          showDelete
          showToggle
          toggleField="isActive"
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => onDelete(id)}
          onToggle={(id, isActive) => onToggle(id, isActive)}
        />

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
  );
};

export default Brand;
