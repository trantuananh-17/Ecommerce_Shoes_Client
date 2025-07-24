import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addSizeAPI, fetchSizesAPI } from "../../../services/size.service";

export const useSizes = (page: number, limit: number = 8) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["sizes", page],
    queryFn: () => fetchSizesAPI(page, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addSize = useMutation({
    mutationFn: (size: string) => addSizeAPI(size),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });

  return {
    sizes: data?.data?.data || [],
    paginationData: data?.data,
    isPending,
    error,
    addSize,
  };
};
