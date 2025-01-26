import { Button } from "@mui/base/Button";
import { useModalStore } from "../store";
import { Coin } from "../types";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { CoinName } from "./CoinName";

export const CoinSelectorButton = ({
  selectedCoin,
  error,
  errorText,
  disabled,
}: {
  selectedCoin?: Coin;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
}) => {
  const { setCoinSelectorOpen } = useModalStore();

  const isError = error && !selectedCoin;

  return (
    <Box className="mb-5">
      <FormControl error={isError} variant="standard" fullWidth>
        <Button
          onClick={setCoinSelectorOpen}
          className={` border border-rounded-sm bg-grey-200 py-3 px-4  rounded-md w-full text-sm transition-colors ${
            selectedCoin ? "text-left" : "text-center"
          } ${isError ? "border-red" : "border-grey-200 "} ${
            disabled
              ? "text-grey-400 cursor-not-allowed"
              : "text-text-color cursor-pointer hover:bg-transparent"
          } ${!disabled && !isError ? "hover:border-grey-400" : ""}`}
        >
          {selectedCoin ? (
            <CoinName name={selectedCoin.name} symbol={selectedCoin.symbol} />
          ) : (
            "Select coin"
          )}
        </Button>
        {isError ? (
          <FormHelperText sx={{ mx: "14px" }}>{errorText}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
};
