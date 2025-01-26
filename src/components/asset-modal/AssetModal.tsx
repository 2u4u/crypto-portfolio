import {
  Box,
  IconButton,
  Modal,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useAssetsStore, useModalStore } from "../../shared/store";
import { useState, MouseEvent, useEffect } from "react";
import CurrencyChart from "../currency-chart/CurrencyChart";
import { Close as CloseIcon } from "@mui/icons-material";

export const AssetModal = () => {
  const { isAssetModalOpen, setAssetModalClose } = useModalStore();
  const { selectedAsset, getDetailedAsset, detailedAsset } = useAssetsStore();
  const [duration, setDuration] = useState("90");
  const [graphLoading, setGraphLoading] = useState(true);

  useEffect(() => {
    if (selectedAsset) {
      const fetchData = async () => {
        setGraphLoading(true);
        await getDetailedAsset(selectedAsset.id, duration);
        setGraphLoading(false);
      };
      fetchData();
    }
  }, [duration, getDetailedAsset, selectedAsset]);

  const handleChangeDuration = (
    _: MouseEvent<HTMLElement>,
    newDuration: string
  ) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  return (
    <Modal open={isAssetModalOpen} onClose={setAssetModalClose}>
      <Box className="absolute top-1/2 left-1/2 -translate-1/2 w-[90vw] max-w-[600px] bg-grey-100 rounded-2xl focus-visible:outline-none p-8 max-h-[90vh] flex flex-col">
        <Box className="flex justify-between mb-5">
          <Typography variant="h6">{selectedAsset?.name}</Typography>
          <IconButton
            aria-label="close"
            sx={{ color: "var(--cp-grey-500)", m: "-8px" }}
            onClick={setAssetModalClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-2 my-4">
          <span className="text-sm text-text-color">
            <span className="text-grey-500 mr-2">Symbol:</span>
            {selectedAsset?.symbol}
          </span>
          <span className="text-sm text-text-color">
            <span className="text-grey-500 mr-2">Current Price:</span>{" "}
            {selectedAsset?.currentPrice}
          </span>
          <span className="text-sm text-text-color">
            <span className="text-grey-500 mr-2">Quantity:</span>
            {selectedAsset?.quantity}
          </span>
        </Box>
        <Box className="my-4">
          {graphLoading ? (
            <Skeleton variant="rounded" width={"100%"} height={200} />
          ) : detailedAsset ? (
            <CurrencyChart data={detailedAsset} />
          ) : null}
        </Box>
        <ToggleButtonGroup
          color="primary"
          value={duration}
          exclusive
          onChange={handleChangeDuration}
          aria-label="transaction type"
          className="w-full mb-5"
          size="small"
        >
          <ToggleButton value="7">7d</ToggleButton>
          <ToggleButton value="30">30d</ToggleButton>
          <ToggleButton value="90">90d</ToggleButton>
          <ToggleButton value="365">1y</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Modal>
  );
};
