import { useState } from "react";

export const useSelectionManagement = <T extends { id: string }>(initialItems: T[] = []) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  
  const toggleSelection = (item: T) => {
    setSelectedItems(prev => 
      prev.some(i => i.id === item.id) 
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const toggleSelectAll = (items: T[]) => {
    setSelectedItems(prev => 
      prev.length === items.length ? [] : [...items]
    );
  };

  const clearSelection = () => setSelectedItems([]);

  return {
    selectedItems,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    isAllSelected: (items: T[]) => 
      selectedItems.length === items.length && items.length > 0,
    hasSelection: selectedItems.length > 0
  };
};