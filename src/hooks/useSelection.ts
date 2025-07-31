import { useState, useCallback, useRef } from 'react';


type Identifiable = { id: string } & Record<string, unknown>;

interface UseSelectionProps<T> {
  initialSelectedItems?: T[];
  identifier?: keyof T;
}

export const useSelection = <T extends Identifiable>({
  initialSelectedItems = [] as T[],
  identifier = 'id',
}: UseSelectionProps<T> = {}) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelectedItems);
  const [selectionBatch, setSelectionBatch] = useState<number>(0); // Inicializado com 0
  const batchTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Alterna a seleção de um item individual.
   */
  const toggleSelection = useCallback((item: T) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i[identifier] === item[identifier]);
      return isSelected
        ? prev.filter((i) => i[identifier] !== item[identifier])
        : [...prev, item];
    });
  }, [identifier]);

  /**
   * Seleciona ou desseleciona todos os itens de uma lista.
   */
  const toggleSelectAll = useCallback((items: T[]) => {
    setSelectionBatch((prev) => prev + 1);

    if (batchTimeout.current) {
      clearTimeout(batchTimeout.current);
    }

    batchTimeout.current = setTimeout(() => {
      setSelectionBatch(0);
    }, 1000);

    setSelectedItems((prev) =>
      prev.length === items.length ? [] : [...items]
    );
  }, []);

  /**
   * Limpa toda a seleção.
   */
  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  /**
   * Verifica se um item específico está selecionado.
   */
  const isSelected = (item: T) => {
    return selectedItems.some((i) => i[identifier] === item[identifier]);
  };

  /**
   * Verifica se todos os itens de uma lista estão selecionados.
   */
  const isAllSelected = useCallback((items: T[]) => {
    return items.length > 0 && selectedItems.length === items.length;
  }, [selectedItems]);

  return {
    selectedItems,
    hasSelection: selectedItems.length > 0,
    selectionBatch,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    isSelected,
    isAllSelected,
  };
};