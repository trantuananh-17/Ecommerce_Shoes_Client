import { useEffect, useState } from "react";
import OrderInfo from "../../../components/admin/order/OrderInfo";
import OrderNav, {
  type TabType,
} from "../../../components/admin/order/OrderNav";
import Pagination from "../../../components/admin/ui/Pagination";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import { useSearchParams } from "react-router-dom";
import { fetchOrdersAPI } from "../../../services/order.service";
import { useQuery } from "@tanstack/react-query";

type OrderItem = {
  id: string;
  name: string;
  phone: string;
  province: string;
  orderStatus: string;
  paymentType: boolean;
  status: string;
};

const Order = () => {
  const columns = [
    { label: "Mã đơn hàng", accessor: (row: OrderItem) => row.id },
    { label: "Tên khách hàng", accessor: (row: OrderItem) => row.name },
    { label: "Số điện thoại", accessor: (row: OrderItem) => row.phone },
    { label: "Địa chỉ", accessor: (row: OrderItem) => row.province },
    { label: "Trạng thái", accessor: (row: OrderItem) => row.orderStatus },
    {
      label: "Hình thức thanh toán",
      accessor: (row: OrderItem) => row.paymentType,
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? "pending";

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    totalDocs: 0,
    totalPages: 1,
  });

  const [showInfo, setShowInfo] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    string | undefined
  >("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["orders", status, pagination.page, pagination.limit],
    queryFn: () => fetchOrdersAPI(status, pagination.page, pagination.limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const orders = data?.data?.data || [];
  const paginationData = data?.data;

  useEffect(() => {
    if (paginationData) {
      setPagination((prev) => ({
        ...prev,
        totalDocs: paginationData.totalDocs,
        totalPages: paginationData.totalPages,
        page: paginationData.currentPage,
      }));
    }
  }, [paginationData]);

  const handleClose = () => {
    setShowInfo(false);
  };

  const handleStatusChange = (newStatus: TabType) => {
    setSearchParams({ status: newStatus });
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <section className="overflow-hidden w-full h-full p-4 bg-white">
      <div className="border border-gray-200 w-full h-full rounded-md p-4 flex flex-col">
        <h2 className="text-xl m-4">Quản lý thông tin đơn hàng</h2>

        <div className="mt-auto">
          <OrderNav activeTab={status} onChange={handleStatusChange} />
        </div>

        <div className="border border-gray-100 rounded-md flex flex-col flex-1 overflow-y-auto">
          {isPending ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải dữ liệu</p>
          ) : (
            <TableManyColumn
              columns={columns}
              data={orders}
              showView
              onView={(id) => {
                const selected = orders.find(
                  (order: OrderItem) => order.id === id
                );
                if (selected) {
                  setSelectedOrderStatus(selected.status);
                  setSelectedOrderId(id);
                  setShowInfo(true);
                }
              }}
            />
          )}
        </div>

        <div className="">
          <Pagination
            currentPage={pagination.page}
            totalItems={pagination.totalDocs}
            pageSize={pagination.limit}
            column={true}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {showInfo && selectedOrderId && (
        <OrderInfo
          status={selectedOrderStatus}
          orderId={selectedOrderId}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Order;
