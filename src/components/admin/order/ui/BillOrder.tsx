interface Props {
  subtotal: number;
  discount: number;
  total: number;
}

const BillOrder: React.FC<Props> = ({ subtotal, discount, total }) => {
  return (
    <div className="text-right space-y-1">
      <p className="text-sm text-gray-700">Tạm tính: {subtotal}</p>
      <p className="text-sm text-gray-700">Giảm giá: {discount}</p>
      <p className="text-sm text-gray-700">Phí vận chuyển: 0</p>
      <strong className="text-sm text-gray-700">
        Tổng thanh toán: {total}
      </strong>
    </div>
  );
};

export default BillOrder;
