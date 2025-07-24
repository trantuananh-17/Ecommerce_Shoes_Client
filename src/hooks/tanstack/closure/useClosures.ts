import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addClosureAPI,
  updateClosureAPI,
  fetchClosureByAdminAPI,
  type addClosure,
} from "../../../services/closure.service";

export const useClosures = (page: number, limit: number = 5) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["closures", page, limit],
    queryFn: () => fetchClosureByAdminAPI(page, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addClosure = useMutation({
    mutationFn: (payload: addClosure) => addClosureAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closures"] });
    },
  });

  const updateClosure = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: addClosure }) =>
      updateClosureAPI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closures"] });
    },
  });

  return {
    closures: data?.data?.data || [],
    paginationData: data?.data,
    isPending,
    error,
    addClosure,
    updateClosure,
  };
};
