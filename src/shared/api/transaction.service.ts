import { Transaction } from "../types/transaction.interface";
import {
	deleteFromLocalStorage,
	getAllItemsFromLocalStorage,
	getTransactionByIdFromLocalStorage,
	updateInLocalStorage,
	saveItemToLocalStorage,
} from "./mock.service";

export const transactionService = {
	async create(key: string, data: Transaction) {
		return await saveItemToLocalStorage<Transaction>(key, data);
	},

	async readAll(key: string) {
		return await getAllItemsFromLocalStorage<Transaction>(key);
	},
	async readOne(key: string, id: string) {
		return await getTransactionByIdFromLocalStorage<Transaction>(key, id);
	},

	async update(key: string, id: string, updatedData: Partial<Transaction>) {
		return await updateInLocalStorage<Transaction>(key, id, updatedData);
	},

	async delete(key: string, id: string) {
		return await deleteFromLocalStorage<Transaction>(key, id);
	},
};
