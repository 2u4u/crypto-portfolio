import { Transaction } from "../types";

export const getUniqueCoinNames = (transactions: Transaction[]): string[] => {
  return [...new Set(transactions.map((transaction) => transaction.coinName))];
}

export const getUniqueCoins = (transactions: Transaction[]): Transaction[] => {
  const uniqueCoinMap = new Map<string, Transaction>()

  transactions.forEach(transaction => {
    if (!uniqueCoinMap.has(transaction.coinId)) {
      uniqueCoinMap.set(transaction.coinId, transaction)
    }
  })

  return Array.from(uniqueCoinMap.values())
}
