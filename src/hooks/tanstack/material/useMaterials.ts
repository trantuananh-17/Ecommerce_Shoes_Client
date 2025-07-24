import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMaterialAPI,
  updateMaterialAPI,
  fetchMaterialsByAdminAPI,
  type addMaterial,
} from "../../../services/material.service";

export const useMaterials = (page: number, limit: number = 5) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["materials", page],
    queryFn: () => fetchMaterialsByAdminAPI(page, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const addMaterial = useMutation({
    mutationFn: (payload: addMaterial) => addMaterialAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  const updateMaterial = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: addMaterial }) =>
      updateMaterialAPI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  return {
    materials: data?.data?.data || [],
    paginationData: data?.data,
    isPending,
    error,
    addMaterial,
    updateMaterial,
  };
};
