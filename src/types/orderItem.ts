export type OrderTable = {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  payment: string;
};

export type OrderItemTable = {
  id: string;
  productName: string;
  quantity: number;
  discountedPrice: number;
  totalPrice: number;
};
