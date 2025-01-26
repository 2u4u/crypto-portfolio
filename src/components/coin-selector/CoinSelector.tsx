import {
  ChangeEvent,
  ComponentType,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import { enqueueSnackbar } from "notistack";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
// import { getCoins, useFetch } from "../../shared/api";
import { useModalStore, useTransactionForm } from "../../shared/store";
import { Coin } from "../../shared/types";
import { Check as CheckIcon } from "@mui/icons-material";
import { CoinName } from "../../shared/ui";
import { coinsService } from "../../shared/api";

const List = FixedSizeList as unknown as ComponentType<FixedSizeListProps>;

export const CoinSelector = () => {
  const { isCoinSelectorOpen, setCoinSelectorClose } = useModalStore();
  const { selectedCoin, setSelectedCoin } = useTransactionForm();
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoadingCoins(true);
      try {
        const coins: Coin[] = await coinsService.readAll();
        setCoins(coins);
        setFilteredCoins(coins);
      } catch (error: any) {
        enqueueSnackbar(error, { variant: "error" });
      } finally {
        setLoadingCoins(false);
      }
    };
    if (isCoinSelectorOpen) {
      fetchCoins();
    }
  }, [isCoinSelectorOpen]);

  const validateCoinSearch = useCallback(
    (val: string): Coin[] => {
      const lowerVal = val.toLowerCase();

      const exactMatches: Coin[] = [];
      const partialMatches: Coin[] = [];

      coins.forEach((coin) => {
        const lowerName = coin.name.toLowerCase();
        const lowerCoin = coin.symbol.toLowerCase();

        if (
          (lowerName === lowerVal || lowerCoin === lowerVal) &&
          lowerVal !== ""
        ) {
          exactMatches.push({ ...coin, exact: true });
        } else if (
          lowerName.includes(lowerVal) ||
          lowerCoin.includes(lowerVal)
        ) {
          partialMatches.push(coin);
        }
      });

      return [...exactMatches, ...partialMatches];
    },
    [coins]
  );

  const handleSelectCoin = (coin: Coin) => () => {
    setSelectedCoin(coin);
    setCoinSelectorClose();
  };

  const debouncedValidate = debounce((val: string) => {
    const results = validateCoinSearch(val);
    setFilteredCoins(results);
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedValidate(e.target.value);
  };

  return (
    <Modal open={isCoinSelectorOpen} onClose={setCoinSelectorClose}>
      <Box className="absolute top-1/2 left-1/2 -translate-1/2 w-[90vw] max-w-[600px] bg-grey-100 rounded-2xl focus-visible:outline-none p-8 h-full max-h-[90vh] flex flex-col">
        <Box className="flex justify-between">
          <Typography component="h2">Select Coin</Typography>
          <IconButton
            aria-label="close"
            sx={{ color: "var(--cp-grey-500)", m: "-8px" }}
            onClick={setCoinSelectorClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="my-4 w-full">
          <TextField
            placeholder="Search"
            variant="outlined"
            onChange={handleSearch}
            size="small"
            fullWidth
          />
        </Box>
        <Box className="overflow-hidden h-full">
          {loadingCoins ? (
            Array.from(Array(100).keys()).map((item) => (
              <Box className="py-2" key={item}>
                <Skeleton
                  variant="rounded"
                  sx={{ bgcolor: "var(--cp-grey-300)" }}
                  width={200}
                  height={20}
                />
              </Box>
            ))
          ) : (
            <AutoSizer>
              {({ height, width }: Size) => (
                <List
                  height={height}
                  itemCount={filteredCoins.length}
                  itemSize={35}
                  width={width}
                >
                  {({ index, style }) => (
                    <ListItem
                      style={style}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                      onClick={handleSelectCoin(filteredCoins[index])}
                    >
                      <Box className="text-text-color text-sm cursor-pointer overflow-hidden whitespace-nowrap flex justify-between w-full">
                        <CoinName
                          name={filteredCoins[index].name}
                          symbol={filteredCoins[index].symbol}
                          isExactMatch={filteredCoins[index].exact}
                        />
                        {filteredCoins[index].name === selectedCoin?.name ? (
                          <IconButton
                            aria-label="selected"
                            sx={{ color: "var(--cp-blue)" }}
                          >
                            <CheckIcon />
                          </IconButton>
                        ) : null}
                      </Box>
                      {filteredCoins[index].exact &&
                      !filteredCoins[index + 1].exact ? (
                        <Divider className="absolute bottom-0 bg-grey-300 w-full" />
                      ) : null}
                    </ListItem>
                  )}
                </List>
              )}
            </AutoSizer>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
