import axios from "axios";

export const coinsService = {
	async readAll() {
		try {
			const response = await axios.get('https://api.coingecko.com/api/v3/coins/list', {
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
				}
			})

			return response.data;
		} catch (error) {
			console.error('Failed to fetch coins', error)
			throw 'Failed to fetch coins'
		}
	},

	async readOne(id: string) {
		try {
			const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": import.meta.env.VITE_CRYPTO_API_KEY,
				}
			})

			return response.data;
		} catch (error) {
			console.error('Failed to fetch coin prices', error)
			throw 'Failed to fetch coin prices'
		}
	},
};
