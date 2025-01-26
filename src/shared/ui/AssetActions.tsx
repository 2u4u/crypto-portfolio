import { Asset } from "../../shared/types";
import { AssetsTableActions } from "../../shared/ui";

import { useAssetsStore, useModalStore } from "../../shared/store";

export const AssetActions = ({ asset }: { asset?: Asset }) => {
  const { setAssetModalOpen } = useModalStore();
  const { setSelectedAsset } = useAssetsStore();

  const handleOpenCoinModal = (asset: Asset) => () => {
    setSelectedAsset(asset);
    setAssetModalOpen();
  };

  if (!asset) return null;

  return (
    <AssetsTableActions id={asset.id} onOpen={handleOpenCoinModal(asset)} />
  );
};
