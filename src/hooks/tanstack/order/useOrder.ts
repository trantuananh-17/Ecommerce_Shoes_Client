import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrdersAPI } from "../../../services/order.service";

export const useOrders = (status: string, page: number, limit: number = 8) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["orders", status, page, limit],
    queryFn: () => fetchOrdersAPI(status, page, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return {
    orders: data?.data?.data || [],
    paginationData: data?.data,
    isPending,
    error,
  };
};
