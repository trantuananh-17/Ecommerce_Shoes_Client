export type TabType =
  | "pending"
  | "shipping"
  | "delivered"
  | "canceled"
  | "returned"
  | "all";

type Props = {
  activeTab: string;
  onChange: (tab: TabType) => void;
};

const OrderNav: React.FC<Props> = ({ activeTab, onChange }) => {
  const handleTabClick = (tab: TabType): void => {
    onChange(tab);
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2 cursor-pointer">
          <div
            onClick={() => handleTabClick("pending")}
            className={`inline-block p-4 border-b-2  rounded-t-lg ${
              activeTab === "pending"
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Đang chờ xử lý
          </div>
        </li>
        <li className="me-2 cursor-pointer">
          <div
            onClick={() => handleTabClick("shipping")}
            className={`inline-block p-4 border-b-2  rounded-t-lg ${
              activeTab === "shipping"
                ? "text-blue-600  border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Đang vận chuyển
          </div>
        </li>
        <li className="me-2 cursor-pointer">
          <div
            onClick={() => handleTabClick("delivered")}
            className={`inline-block p-4 border-b-2  rounded-t-lg ${
              activeTab === "delivered"
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Đã giao
          </div>
        </li>
        <li className="me-2 cursor-pointer">
          <div
            onClick={() => handleTabClick("canceled")}
            className={`inline-block p-4 border-b-2  rounded-t-lg ${
              activeTab === "canceled"
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Đã hủy
          </div>
        </li>
        <li className="me-2 cursor-pointer">
          <div
            onClick={() => handleTabClick("returned")}
            className={`inline-block p-4 border-b-2  rounded-t-lg ${
              activeTab === "returned"
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Đã hoàn hàng
          </div>
        </li>
        <li className="me-2  cursor-pointer">
          <div
            onClick={() => handleTabClick("all")}
            className={`inline-block p-4 border-b-2   rounded-t-lg ${
              activeTab === "all"
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            Tất cả
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderNav;
