import Big from "big.js";
import { Box } from "@mui/material";

export const AssetQuantity = ({
  quantity,
  currentPrice,
}: {
  quantity: string | number;
  currentPrice: number;
}) => (
  <Box className="flex flex-col">
    <span>{Number(quantity).toFixed(2)}</span>
    <span className="text-xs">
      ${String(new Big(Number(quantity)).times(Number(currentPrice)))}
    </span>
  </Box>
);
