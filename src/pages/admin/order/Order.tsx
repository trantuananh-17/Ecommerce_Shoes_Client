import { useEffect, useState } from "react";
import OrderInfo from "../../../components/admin/order/OrderInfo";
import OrderNav, {
  type TabType,
} from "../../../components/admin/order/OrderNav";
import Pagination from "../../../components/admin/ui/Pagination";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import { usePagination } from "../../../hooks/usePagination";
import type { OrderTable } from "../../../types/order.type";
import { useOrders } from "../../../hooks/tanstack/order/useOrder";
import { useSearchParams } from "react-router-dom";

type OrderItem = {
  id: string;
  name: string;
  phone: string;
  province: string;
  orderStatus: string;
  paymentType: boolean;
};

const Order = () => {
  const columns = [
    {
      label: "Mã đơn hàng",
      accessor: (row: OrderTable) => row.id,
    },
    {
      label: "Tên khách hàng",
      accessor: (row: OrderTable) => row.name,
    },
    {
      label: "Số điện thoại",
      accessor: (row: OrderTable) => row.phone,
    },
    {
      label: "Địa chỉ",
      accessor: (row: OrderTable) => row.province,
    },
    {
      label: "Trạng thái",
      accessor: (row: OrderTable) => row.orderStatus,
    },
    {
      label: "Hình thức thanh toán",
      accessor: (row: OrderTable) => row.paymentType,
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? "pending";

  const [showInfo, setShowInfo] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    string | undefined
  >("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { pagination, setPage, updatePagination } = usePagination(1, 8);
  const { orders, isPending, error, paginationData } = useOrders(
    status,
    pagination.page,
    pagination.limit
  );

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

  const handleClose = () => {
    setShowInfo(false);
  };

  const handleStatusChange = (newStatus: TabType) => {
    setSearchParams({ status: newStatus });
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
            onPageChange={setPage}
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
