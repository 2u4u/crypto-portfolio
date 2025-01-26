import { Box } from "@mui/material";

export const CoinName = ({
  name,
  symbol,
  isExactMatch,
}: {
  name: string;
  symbol: string;
  isExactMatch?: boolean;
}) => (
  <Box className="overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
    {isExactMatch ? (
      <span className="font-mono text-[8px] opacity-40 mr-2 font-bold">
        EXACT MATCH
      </span>
    ) : null}
    <div className="mr-2 text-ellipsis">{name}</div>
    <span className="opacity-40">{symbol}</span>
  </Box>
);
