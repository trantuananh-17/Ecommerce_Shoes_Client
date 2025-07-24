import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderDetailAPI } from "../../../services/order.service";
import type { OrderDetailResponse } from "../../../types/order.type";

export const useOrderDetail = (id: string) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery<OrderDetailResponse>({
    queryKey: ["orderDetail", id],
    queryFn: () => fetchOrderDetailAPI(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id, // Chỉ fetch khi có id
  });

  return {
    orderDetails: data?.data,
    isPending,
    error,
  };
};
