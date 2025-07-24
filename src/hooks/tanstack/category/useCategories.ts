import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCategoryAPI,
  fetchCategoryAPI,
  updateCategoryAPI,
  type addCategory,
  type updateCategory,
} from "../../../services/category.service";

export const useCategories = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => fetchCategoryAPI(page, limit),
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  const addCategory = useMutation({
    mutationFn: (data: addCategory) => addCategoryAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateCategory }) =>
      updateCategoryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories: data?.data.data || [],
    paginationData: data?.data,
    isPending,
    error,
    addCategory,
    updateCategory,
  };
};
