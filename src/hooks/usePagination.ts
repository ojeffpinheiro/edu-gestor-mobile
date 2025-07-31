import { useState, useCallback } from 'react';

interface UsePaginationProps<T> {
  initialPage?: number;
  pageSize?: number;
  initialItems?: T[];
}

export const usePagination = <T,>({
  initialPage = 1,
  pageSize = 10,
  initialItems = [],
}: UsePaginationProps<T> = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>(initialItems);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Carrega mais itens (genérico - deve ser implementado pelo consumidor do hook)
   */
  const loadMore = useCallback(
    async (fetchFn: (page: number) => Promise<T[]>) => {
      if (!hasMore || isLoading) return;

      setIsLoading(true);
      try {
        const nextPage = currentPage + 1;
        const newItems = await fetchFn(nextPage);

        setItems((prev) => [...prev, ...newItems]);
        setCurrentPage(nextPage);
        setHasMore(newItems.length === pageSize);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, hasMore, isLoading, pageSize]
  );

  /**
   * Reseta a paginação
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setItems(initialItems);
    setHasMore(true);
  }, [initialPage, initialItems]);

  return {
    currentPage,
    items,
    hasMore,
    isLoading,
    loadMore,
    resetPagination,
    setItems,
  };
};