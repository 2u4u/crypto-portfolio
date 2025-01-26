import { Avatar, Box } from "@mui/material";
import { CoinName } from "./CoinName";

export const AssetName = ({
  name,
  image,
  symbol,
}: {
  name: string;
  image: string;
  symbol: string;
}) => (
  <Box className="flex items-center gap-2">
    <Avatar alt={name} src={image} />
    <CoinName name={name} symbol={symbol} />
  </Box>
);
