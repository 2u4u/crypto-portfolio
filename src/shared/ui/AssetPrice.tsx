import { Box } from "@mui/material";

export const AssetPrice = ({
  currentPrice,
}: {
  currentPrice: string | number;
}) => <Box>${Number(currentPrice).toFixed(6)}</Box>;
