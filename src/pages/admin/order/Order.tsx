import { useState } from "react";
import OrderInfo from "../../../components/admin/order/OrderInfo";
import OrderNav from "../../../components/admin/order/OrderNav";
import Pagination from "../../../components/admin/ui/Pagination";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import { usePagination } from "../../../hooks/usePagination";
import type { OrderTable } from "../../../types/orderItem";

const Order = () => {
  const orders = [
    {
      id: "DH2025719292369",
      name: "Tuấn Anh",
      phone: "0918590630",
      address: "Bắc Ninh",
      status: "Đang vận chuyển",
      payment: "Thanh toán qua ví VNPay",
    },
  ];

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
      accessor: (row: OrderTable) => row.address,
    },
    {
      label: "Trạng thái",
      accessor: (row: OrderTable) => row.status,
    },
    {
      label: "Hình thức thanh toán",
      accessor: (row: OrderTable) => row.payment,
    },
  ];

  const [showInfo, setShowInfo] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    string | undefined
  >("");

  const { pagination, setPage, updatePagination } = usePagination(1, 8);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <section className="overflow-hidden w-full h-full p-4 bg-white">
      <div className="border border-gray-200 w-full h-full rounded-md p-4 flex flex-col">
        <h2 className="text-xl m-4">Quản lý thông tin đơn hàng</h2>

        <div className="mt-auto">
          <OrderNav />
        </div>

        <div className="border border-gray-100 rounded-md flex flex-col flex-1 overflow-y-auto">
          <TableManyColumn
            columns={columns}
            data={orders}
            showView
            onView={(id) => {
              const selected = orders.find((order) => order.id === id);
              if (selected) {
                setSelectedOrderStatus(selected.status);
                setShowInfo(true);
              }
            }}
          />
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
      {showInfo && (
        <OrderInfo status={selectedOrderStatus} onClose={handleClose} />
      )}
    </section>
  );
};

export default Order;
