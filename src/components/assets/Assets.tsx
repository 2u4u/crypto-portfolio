import { Box, Skeleton, Typography } from "@mui/material";
import { AssetsTable } from "../assets-table/AssetsTable";
import { useAssetsStore } from "../../shared/store";
import { useEffect, useState } from "react";
import { AllocationGraph } from "../allocation-graph/AllocationGraph";
import { AssetModal } from "../asset-modal/AssetModal";

export const Assets = () => {
  const { assets, assetsLoading, setAssetsLoading, getAssets } =
    useAssetsStore();

  const [assetsError, setAssetsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      setAssetsLoading(true);
      try {
        await getAssets();
      } catch (error) {
        setAssetsError(error as string);
      }
      setAssetsLoading(false);
    };
    fetchAssets();
  }, [getAssets, setAssetsLoading]);

  return (
    <Box className="flex flex-col h-full">
      <Box className="flex gap-2 m-4">
        <Typography variant="h6">Total Assets</Typography>
        <Typography variant="h6">
          $
          {assets
            ?.reduce(
              (acc, asset) => acc + asset.currentPrice * asset.quantity,
              0
            )
            .toFixed(6)}
        </Typography>
      </Box>
      <Box className="flex flex-col bg-grey-200 p-5 rounded-md h-[300px]">
        <Typography variant="h6">Assets Allocation</Typography>
        {assetsLoading ? (
          <Box className="flex items-center justify-center">
            <Skeleton variant="circular" width={150} height={150} />
          </Box>
        ) : (
          <AllocationGraph assets={assets || []} />
        )}
      </Box>

      <AssetsTable
        assets={assets}
        loading={assetsLoading}
        error={assetsError}
      />
      <AssetModal />
    </Box>
  );
};
