import { useCallback, useState } from "react";

export type PaginationState = {
  page: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  totalDocs: number;
};

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    currentPage: initialPage,
    totalPages: 0,
    limit: initialLimit,
    totalDocs: 0,
  });

  const updatePagination = useCallback(
    (data: {
      totalDocs: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    }) => {
      setPagination((prev) => ({
        ...prev,
        ...data,
      }));
    },
    []
  );

  const setPage = useCallback((newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
      currentPage: newPage,
    }));
  }, []);

  return {
    pagination,
    setPage,
    updatePagination,
  };
};
