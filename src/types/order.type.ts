export type OrderTable = {
  id: string;
  name: string;
  phone: string;
  province: string;
  orderStatus: string;
  paymentType: string;
};

export type OrderItemTable = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export interface OrderInfo {
  id: string;
  orderStatus: string;
  paymentStatus: string;
  paymentType: string;
  discount: number;
  name: string;
  phone: string;
  email: string;
  note: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  orderItemsPrices: number;
  orderTotalPrices: number;
  datePayment: string;
  dateReceive: string;
  createdAt: string;
}

export interface OrderDetailResponse {
  status_code: number;
  message: string;
  data: {
    orderInfo: OrderInfo;
    orderItemsInfo: OrderItemTable[];
  };
}
