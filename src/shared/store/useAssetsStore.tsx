import { create } from "zustand";
import { Asset, AssetMarketChart } from "../types";
import { assetsService } from "../api";

interface AssetsStore {
  assets?: Asset[];
  setAsset: (assets: Asset[] | undefined) => void;
  getAssets: () => Promise<void>;
  assetsLoading: boolean;
  setAssetsLoading: (loading: boolean) => void;
  selectedAsset: Asset | undefined;
  setSelectedAsset: (asset: Asset | undefined) => void;
  getDetailedAsset: (id: string, duration: string) => Promise<void>;
  detailedAsset?: AssetMarketChart;
}

export const useAssetsStore = create<AssetsStore>((set) => ({
  assets: undefined,
  setAsset: (assets) => set({ assets }),
  getAssets: async () => {
    const assets = await assetsService.readAll("transaction");
    set({ assets });
  },
  assetsLoading: false,
  setAssetsLoading: (loading) => set({ assetsLoading: loading }),
  selectedAsset: undefined,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  getDetailedAsset: async (id: string, duration: string) => {
    const detailedAsset = await assetsService.readOne(id, duration);
    set({ detailedAsset });
  },
  detailedAsset: undefined,
}));
