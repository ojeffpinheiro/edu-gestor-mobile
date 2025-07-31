import { useState } from 'react';

interface UseSelectionProps<T> {
  initialSelectedItems?: T[];
  identifier?: keyof T;
}

export const useSelection = <T extends Record<string, any>>({
  initialSelectedItems = [],
  identifier = 'id',
}: UseSelectionProps<T> = {}) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelectedItems);
  /**
   * Alterna a seleção de um item individual.
   */
  const toggleSelection = (item: T) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i[identifier] === item[identifier]);
      return isSelected
        ? prev.filter((i) => i[identifier] !== item[identifier])
        : [...prev, item];
    });
  };

  /**
   * Seleciona ou desseleciona todos os itens de uma lista.
   */
  const toggleSelectAll = (items: T[]) => {
    setSelectedItems(selectedItems.length === items.length ? [] : [...items]);
  };

  /**
   * Limpa toda a seleção.
   */
  const clearSelection = () => {
    setSelectedItems([]);
  };

  /**
   * Verifica se um item específico está selecionado.
   */
  const isSelected = (item: T) => {
    return selectedItems.some((i) => i[identifier] === item[identifier]);
  };

  /**
   * Verifica se todos os itens de uma lista estão selecionados.
   */
  const isAllSelected = (items: T[]) => {
    return items.length > 0 && selectedItems.length === items.length;
  };

  return {
    selectedItems,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    isAllSelected,
    hasSelection: selectedItems.length > 0,
  };
};