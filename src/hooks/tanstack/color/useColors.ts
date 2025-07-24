import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addColorAPI,
  fetchColorsByAdminAPI,
  type addColor,
} from "../../../services/color.service";

export const useColors = (page: number, limit: number = 8) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["colors", page],
    queryFn: () => fetchColorsByAdminAPI(page, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addColor = useMutation({
    mutationFn: (payload: addColor) => addColorAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });

  return {
    colors: data?.data?.data || [],
    paginationData: data?.data,
    isPending,
    error,
    addColor,
  };
};
