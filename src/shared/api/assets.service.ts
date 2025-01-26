import axios from "axios";
import { Transaction } from "../types/transaction.interface";
import { getUniqueCoins } from "../utils/helpers";
import {
	getAllItemsFromLocalStorage,
} from "./mock.service";
import { CoinDetailedData } from "../types";

export const assetsService = {
	async readAll(key: string) {
		const transactions = await getAllItemsFromLocalStorage<Transaction>(key);
		const uniqueCoins = getUniqueCoins(transactions);
		const uniqueCoinIds = uniqueCoins.map((coin) => coin.coinId);
		
		if (uniqueCoinIds.length === 0) return []

		const processTransactions = (transactions: Transaction[]): Record<string, { quantity: number }> => {
			return transactions.reduce((acc, transaction) => {
				if (!acc[transaction.coinId]) {
						acc[transaction.coinId] = { quantity: 0 }
				}

				const quantityNum = parseFloat(transaction.quantity)
				
				if (transaction.type === 'buy') {
						acc[transaction.coinId].quantity += quantityNum
				} else if (transaction.type === 'sell') {
						acc[transaction.coinId].quantity -= quantityNum
				}

				return acc
			}, {} as Record<string, { quantity: number }>)
		}

		try {
			const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
				params: {
					vs_currency: 'usd',
					ids: uniqueCoinIds.join(',')
				},
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
				}
			})

			return uniqueCoins.map((coin) => {
				const coinQuantity = processTransactions(transactions)[coin.coinId]
				const coinDetails = response.data.find((cp: CoinDetailedData) => cp.id === coin.coinId)

				return {
					id: coin.coinId,
					name: coin.coinName,
					symbol: coin.coinSymbol,
					quantity: coinQuantity?.quantity || 0,
					currentPrice: coinDetails?.current_price || 0,
					image: coinDetails?.image || '',
				}
			})
		} catch (error) {
			console.error('Failed to fetch coin prices', error)
			throw 'Failed to fetch coin prices'
		}
	},
	async readOne(id: string, duration: string) {
		try {
			const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
				params: {

					vs_currency: 'usd',
					days: Number(duration),
				},
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
				}
			})
			return response.data
		} catch (error) {
			console.error('Failed to fetch coin prices', error)
			throw 'Failed to fetch coin prices'
		}
	},
};

