export interface Asset {
	id: string;
	name: string;
	symbol: string;
	currentPrice: number;
	quantity: number;
	image: string;
}

export interface AssetMarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}