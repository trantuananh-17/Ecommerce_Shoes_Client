import { X } from "lucide-react";
import OrderDetailItem from "./ui/OrderDetailItem";
import UserDetailItem from "./ui/UserDetailItem";
import type { OrderItemTable } from "../../../types/orderItem";
import TableManyColumn from "../ui/table/TableManyColumn";
import BillOrder from "./ui/BillOrder";

const columns = [
  {
    label: "Tên sản phẩm",
    accessor: (row: OrderItemTable) => row.productName,
  },
  {
    label: "Đơn giá",
    accessor: (row: OrderItemTable) => row.discountedPrice,
  },
  {
    label: "Số lượng",
    accessor: (row: OrderItemTable) => row.quantity,
  },
  {
    label: "Tổng tiền",
    accessor: (row: OrderItemTable) => row.totalPrice,
  },
];

const orderItemData: OrderItemTable[] = [
  {
    id: "1",
    productName: "Áo thun nam cổ tròn",
    quantity: 2,
    discountedPrice: 150000,
    totalPrice: 300000,
  },
];

interface Props {
  status?: string;
  onClose: () => void;
}

const OrderInfo: React.FC<Props> = ({ status, onClose }) => {
  const renderActionButton = () => {
    switch (status) {
      case "Đang chờ xử lí":
        return (
          <div className="flex justify-end gap-4">
            <button className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600">
              Xác nhận
            </button>
            <button className="bg-yellow-400 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-500">
              Hủy đơn
            </button>
            <button
              className="bg-red-400 text-white px-5 py-2.5 rounded-lg hover:bg-red-500"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        );

      case "Đang vận chuyển":
        return (
          <div className="flex justify-end gap-4">
            <button className="bg-yellow-400 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-500">
              Khách không nhận hàng
            </button>
            <button className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600">
              Xác nhận đã giao hàng
            </button>
            <button
              className="bg-red-400 text-white px-5 py-2.5 rounded-lg hover:bg-red-500"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        );

      default:
        return (
          <div className="flex justify-end">
            <button
              className="bg-red-400 text-white px-5 py-2.5 rounded-lg hover:bg-red-500"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div
        className="fixed inset-0 bg-black opacity-20 z-0"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="relative z-10 flex items-start justify-center px-2 py-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
          <div className="flex justify-between mb-5">
            <h3 className="text-md font-semibold">ĐƠN HÀNG - DH202571969700</h3>
            <button type="button" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="flex gap-10 mb-6">
            <div className="flex flex-col gap-4 flex-1">
              <h4 className="text-blue-500">Thông tin đơn hàng</h4>
              <OrderDetailItem title="Mã đơn hàng:" content="DH202571969700" />
              <OrderDetailItem
                title="Trạng thái đơn hàng:"
                content="Chưa thanh toán"
              />
              <OrderDetailItem
                title="Trạng thái thanh toán:"
                content="Chưa thanh toán"
              />
              <OrderDetailItem
                title="Hình thức thanh toán:"
                content="Thanh toán khi nhận hàng"
              />
              <OrderDetailItem
                title="Thời gian đặt hàng:"
                content="19/07/2025"
              />
              <OrderDetailItem
                title="Thời gian thanh toán:"
                content="Chưa xác định"
              />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <h4 className="text-blue-500">Thông tin khách hàng</h4>
              <UserDetailItem
                title="Thông tin khách hàng:"
                content="Tuấn anh-0918590630"
              />
              <UserDetailItem
                title="Email nhận hóa đơn:"
                content="kimmanh09@gmail.com"
              />
              <UserDetailItem
                title="Địa chỉ nhận hàng:"
                content="Quốc Tuấn, Kiến Xương, Thái Bình, Tp Thái Bình"
              />
              <UserDetailItem title="Thông tin ghi chú:" content="Không có" />
            </div>
          </div>

          <div className="mb-6">
            <TableManyColumn columns={columns} data={orderItemData} />
          </div>

          <BillOrder discount={0} subtotal={4500000} total={45000000} />

          <div className="text-right mt-4">{renderActionButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
