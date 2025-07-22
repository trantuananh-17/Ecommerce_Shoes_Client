import OrderNav from "../../../components/admin/order/OrderNav";
import Pagination from "../../../components/admin/ui/Pagination";
import TableManyColumn from "../../../components/admin/ui/table/TableManyColumn";
import { usePagination } from "../../../hooks/usePagination";

const Order = () => {
  const orders = [
    {
      id: "DH2025719292369",
      name: "Tuấn Anh",
      phone: "0918590630",
      address: "Bắc Ninh",
      status: "Đã giao hàng",
      payment: "Thanh toán qua ví VNPay",
    },
    // {
    //   id: "DH2025510627418",
    //   name: "Tran Tuan Anh",
    //   phone: "0918590630",
    //   address: "Hòa Bình",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán khi nhận hàng",
    // },
    // {
    //   id: "DH2025719292369",
    //   name: "Tuấn Anh",
    //   phone: "0918590630",
    //   address: "Bắc Ninh",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán qua ví VNPay",
    // },
    // {
    //   id: "DH2025510627418",
    //   name: "Tran Tuan Anh",
    //   phone: "0918590630",
    //   address: "Hòa Bình",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán khi nhận hàng",
    // },
    // {
    //   id: "DH2025719292369",
    //   name: "Tuấn Anh",
    //   phone: "0918590630",
    //   address: "Bắc Ninh",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán qua ví VNPay",
    // },
    // {
    //   id: "DH2025719292369",
    //   name: "Tuấn Anh",
    //   phone: "0918590630",
    //   address: "Bắc Ninh",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán qua ví VNPay",
    // },
    // {
    //   id: "DH2025510627418",
    //   name: "Tran Tuan Anh",
    //   phone: "0918590630",
    //   address: "Hòa Bình",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán khi nhận hàng",
    // },
    // {
    //   id: "DH2025719292369",
    //   name: "Tuấn Anh",
    //   phone: "0918590630",
    //   address: "Bắc Ninh",
    //   status: "Đã giao hàng",
    //   payment: "Thanh toán qua ví VNPay",
    // },
  ];

  const columns = [
    {
      label: "Mã đơn hàng",
      accessor: (row: OrderItem) => row.id,
    },
    {
      label: "Tên khách hàng",
      accessor: (row: OrderItem) => row.name,
    },
    {
      label: "Số điện thoại",
      accessor: (row: OrderItem) => row.phone,
    },
    {
      label: "Địa chỉ",
      accessor: (row: OrderItem) => row.address,
    },
    {
      label: "Trạng thái",
      accessor: (row: OrderItem) => row.status,
    },
    {
      label: "Hình thức thanh toán",
      accessor: (row: OrderItem) => row.payment,
    },
  ];

  type OrderItem = {
    id: string;
    name: string;
    phone: string;
    address: string;
    status: string;
    payment: string;
  };

  const { pagination, setPage, updatePagination } = usePagination(1, 8);

  return (
    <section className="w-full h-full p-4 bg-white">
      <div className="border border-gray-200 w-full h-full rounded-md p-4 flex flex-col">
        <h2 className="text-xl m-4">Quản lý thông tin đơn hàng</h2>

        <div className="mt-auto">
          <OrderNav />
        </div>

        <div className="border border-gray-100 rounded-md flex flex-col flex-1 overflow-y-auto">
          <TableManyColumn columns={columns} data={orders} showView />
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
    </section>
  );
};

export default Order;
