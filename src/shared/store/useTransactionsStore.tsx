import { create } from "zustand";
import { Transaction } from "../types/transaction.interface";
import { transactionService } from "../api";

interface TransactionsStore {
  transactions?: Transaction[];
  setTransactions: (transactions: Transaction[] | undefined) => void;
  getTransactions: () => Promise<void>;
  transactionsLoading: boolean;
  setTransactionsLoading: (loading: boolean) => void;
}

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: undefined,
  setTransactions: (transactions) => set({ transactions }),
  getTransactions: async () => {
    const transactions = await transactionService.readAll("transaction");
    set({
      transactions: transactions.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    });
  },
  transactionsLoading: false,
  setTransactionsLoading: (loading) => set({ transactionsLoading: loading }),
}));
