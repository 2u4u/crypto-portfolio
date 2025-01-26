import { create } from "zustand";
import { useTransactionForm } from "./useTransactionFormStore";

interface ModalsStore {
  isTransactionFormOpen: boolean;
  setTransactionFormOpen: () => void;
  setTransactionFormClose: () => void;
  isCoinSelectorOpen: boolean;
  setCoinSelectorOpen: () => void;
  setCoinSelectorClose: () => void;
  isAssetModalOpen: boolean;
  setAssetModalOpen: () => void;
  setAssetModalClose: () => void;
}

export const useModalStore = create<ModalsStore>((set) => ({
  isTransactionFormOpen: false,
  setTransactionFormOpen: () => set({ isTransactionFormOpen: true }),
  setTransactionFormClose: () => {
    set({ isTransactionFormOpen: false });
    useTransactionForm.getState().setSelectedCoin(undefined);
    useTransactionForm.getState().setTransactionId(undefined);
  },
  isCoinSelectorOpen: false,
  setCoinSelectorOpen: () => set({ isCoinSelectorOpen: true }),
  setCoinSelectorClose: () => set({ isCoinSelectorOpen: false }),
  isAssetModalOpen: false,
  setAssetModalOpen: () => set({ isAssetModalOpen: true }),
  setAssetModalClose: () => set({ isAssetModalOpen: false }),
}));
