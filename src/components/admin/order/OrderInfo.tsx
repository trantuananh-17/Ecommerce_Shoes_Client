import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import OrderDetailItem from "./ui/OrderDetailItem";
import UserDetailItem from "./ui/UserDetailItem";
import TableManyColumn from "../ui/table/TableManyColumn";
import BillOrder from "./ui/BillOrder";
import {
  cancelOrderAPI,
  fetchOrderDetailAPI,
  updateStatusOrderAPI,
} from "../../../services/order.service";
import type { OrderItemTable } from "../../../types/order.type";
import {
  formatDate,
  formatPrice,
  formatText,
} from "../../../utils/formatHelper";

const columns = [
  {
    label: "Tên sản phẩm",
    accessor: (row: OrderItemTable) => row.productName,
  },
  {
    label: "Đơn giá",
    accessor: (row: OrderItemTable) => row.price,
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

interface Props {
  status?: string;
  orderId: string;
  onClose: () => void;
  onUpdateSuccess?: (message: string) => void;
}

const OrderInfo: React.FC<Props> = ({
  status,
  orderId,
  onClose,
  onUpdateSuccess,
}) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => fetchOrderDetailAPI(orderId),
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStatusOrderAPI(id, status),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderDetail"] });

      onUpdateSuccess?.(response?.message);
      onClose();
    },
  });

  const cancelOrder = useMutation({
    mutationFn: ({
      id,
      orderNote,
    }: {
      id: string;
      orderNote: { vi: string; en: string };
    }) => cancelOrderAPI(id, orderNote),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderDetail"] });

      onUpdateSuccess?.(response.message);
      onClose();
    },
  });

  const handleUpdatePendding = () => {
    updateStatus.mutate({ id: orderId, status: "shipping" });
  };

  const handleUpdateShipping = () => {
    updateStatus.mutate({ id: orderId, status: "delivered" });
  };

  const handleCancelOrder = () => {
    cancelOrder.mutate({
      id: orderId,
      orderNote: {
        vi: "Thông tin không hợp lệ.",
        en: "Invalid ìnormation",
      },
    });
  };

  const handleUpdateOrderCancel = () => {
    cancelOrder.mutate({
      id: orderId,
      orderNote: {
        vi: "Khách hàng không nhận hàng. Đang chờ chuyển hoàn.",
        en: "Customer did not accept the order. Return process pending",
      },
    });
  };

  const orderDetails = data?.data;
  if (!orderDetails) return null;

  const orderInfo = orderDetails.orderInfo;
  const orderItems = orderDetails.orderItemsInfo;

  const renderActionButton = () => {
    switch (status) {
      case "Đang chờ xử lý":
        return (
          <div className="flex justify-end gap-4">
            <button
              className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600"
              onClick={handleUpdatePendding}
            >
              Xác nhận
            </button>
            <button
              className="bg-yellow-400 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-500"
              onClick={handleCancelOrder}
            >
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
            <button
              className="bg-yellow-400 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-500"
              onClick={handleUpdateOrderCancel}
            >
              Khách không nhận hàng
            </button>
            <button
              className="bg-teal-500 text-white px-5 py-2.5 rounded-lg hover:bg-teal-600"
              onClick={handleUpdateShipping}
            >
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-20 z-0"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="relative z-10 flex items-start justify-center px-2 py-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
          <div className="flex justify-between mb-5">
            <h3 className="text-md font-semibold">
              ĐƠN HÀNG - {orderInfo?.id}
            </h3>
            <button type="button" onClick={onClose}>
              <X />
            </button>
          </div>

          {isPending ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p>Đã xảy ra lỗi khi tải dữ liệu</p>
          ) : (
            <>
              <div className="flex gap-10 mb-6">
                <div className="flex flex-col gap-4 flex-1">
                  <h4 className="text-blue-500">Thông tin đơn hàng</h4>
                  <OrderDetailItem
                    title="Mã đơn hàng:"
                    content={orderInfo.id}
                  />
                  <OrderDetailItem
                    title="Trạng thái đơn hàng:"
                    content={orderInfo.orderStatus}
                  />
                  <OrderDetailItem
                    title="Trạng thái thanh toán:"
                    content={orderInfo.paymentStatus}
                  />
                  <OrderDetailItem
                    title="Hình thức thanh toán:"
                    content={orderInfo.paymentType}
                  />
                  <OrderDetailItem
                    title="Thời gian đặt hàng:"
                    content={formatDate(orderInfo.createdAt)}
                  />
                  <OrderDetailItem
                    title="Thời gian thanh toán:"
                    content={formatDate(orderInfo.datePayment)}
                  />
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  <h4 className="text-blue-500">Thông tin khách hàng</h4>
                  <UserDetailItem
                    title="Thông tin khách hàng:"
                    content={formatText(
                      `${orderInfo.name} - ${orderInfo.phone}`
                    )}
                  />
                  <UserDetailItem
                    title="Email nhận hóa đơn:"
                    content={formatText(orderInfo.email)}
                  />
                  <UserDetailItem
                    title="Địa chỉ nhận hàng:"
                    content={formatText(
                      `${orderInfo.address}, ${orderInfo.ward}, ${orderInfo.district}, ${orderInfo.province}`
                    )}
                  />
                  <UserDetailItem
                    title="Thông tin ghi chú:"
                    content={formatText(orderInfo.note)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <TableManyColumn columns={columns} data={orderItems} />
              </div>

              <BillOrder
                discount={formatPrice(orderInfo.discount)}
                subtotal={formatPrice(orderInfo.orderItemsPrices)}
                total={formatPrice(orderInfo.orderTotalPrices)}
              />
            </>
          )}

          <div className="text-right mt-4">{renderActionButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
