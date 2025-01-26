import { create } from "zustand";
import { Coin, Transaction } from "../types";
import { transactionService } from "../api";

interface TransactionFormStore {
  selectedCoin?: Coin;
  setSelectedCoin: (coin: Coin | undefined) => void;
  transactionId?: string;
  setTransactionId: (transactionId: string | undefined) => void;
  transaction?: Transaction;
  setTransaction: (transaction: Transaction | undefined) => void;
  transactionLoading: boolean;
  setTransactionLoading: (loading: boolean) => void;
}

export const useTransactionForm = create<TransactionFormStore>((set) => ({
  selectedCoin: undefined,
  setSelectedCoin: (coin) => set({ selectedCoin: coin }),
  transactionId: undefined,
  setTransactionId: async (transactionId) => {
    set({ transactionId });
    if (transactionId) {
      set({ transactionLoading: true });
      const transaction = await transactionService.readOne(
        "transaction",
        transactionId
      );
      set({ transaction: transaction || undefined });
      set({ transactionLoading: false });
      if (transaction?.coinName) {
        set({
          selectedCoin: {
            name: transaction?.coinName,
            symbol: transaction?.coinSymbol,
            id: transaction?.coinId,
          },
        });
      }
    }
    if (!transactionId) {
      set({ transaction: undefined });
      set({ selectedCoin: undefined });
    }
  },
  transaction: undefined,
  setTransaction: (transaction) => set({ transaction }),
  transactionLoading: false,
  setTransactionLoading: (loading) => set({ transactionLoading: loading }),
}));
