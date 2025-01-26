import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { useTransactionsStore } from "../../shared/store";
import { getUniqueCoinNames } from "../../shared/utils/helpers";
import { TransactionsTable } from "../transactions-table/TransactionsTable";
import { Transaction } from "../../shared/types";
import { FilterList as FilterListIcon } from "@mui/icons-material";

const sortOptions = [
  { value: "priceLowToHigh", label: "Price: Low to High " },
  { value: "priceHighToLow", label: "Price: High to Low" },
  { value: "quantityHighToLow", label: "Quantity: High to Low" },
  { value: "quantityLowToHigh", label: "Quantity: Low to High" },
];

const typeOptions = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

export const Transactions = () => {
  const {
    transactions,
    getTransactions,
    setTransactionsLoading,
    transactionsLoading,
  } = useTransactionsStore();
  const [coinNames, setCoinNames] = useState<string[]>([]);
  const [filteredCoin, setFilteredCoin] = useState("allCoins");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | undefined
  >(undefined);
  const [selectedSort, setSelectedSort] = useState("defaultSort");
  const [filteredType, setFilteredType] = useState("allTypes");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    setTransactionsLoading(true);
    getTransactions();
    setTransactionsLoading(false);
  }, [getTransactions, setTransactionsLoading]);

  useEffect(() => {
    if (transactions) {
      setCoinNames(getUniqueCoinNames(transactions));
    }
  }, [transactions]);

  const sortTransactions = useCallback(
    (transactions: Transaction[]) => {
      switch (selectedSort) {
        case "priceLowToHigh":
          return [...transactions].sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
        case "priceHighToLow":
          return [...transactions].sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
        case "quantityHighToLow":
          return [...transactions].sort(
            (a, b) => Number(b.quantity) - Number(a.quantity)
          );
        case "quantityLowToHigh":
          return [...transactions].sort(
            (a, b) => Number(a.quantity) - Number(b.quantity)
          );
        default:
          return [...transactions];
      }
    },
    [selectedSort]
  );

  const filterTransactions = useCallback(
    (transactions: Transaction[]) => {
      if (filteredCoin === "allCoins") {
        return [...transactions];
      } else {
        return [...transactions].filter(
          (transaction) => transaction.coinName === filteredCoin
        );
      }
    },
    [filteredCoin]
  );

  const filterTransactionsByType = useCallback(
    (transactions: Transaction[]) => {
      if (filteredType === "allTypes") {
        return [...transactions];
      } else {
        return [...transactions].filter(
          (transaction) => transaction.type === filteredType
        );
      }
    },
    [filteredType]
  );

  useEffect(() => {
    if (transactions) {
      setFilteredTransactions(
        sortTransactions(
          filterTransactions(filterTransactionsByType(transactions))
        )
      );
    }
  }, [
    filterTransactions,
    filteredCoin,
    filterTransactionsByType,
    selectedSort,
    sortTransactions,
    transactions,
    filteredType,
  ]);

  const handleFilterCoin = (event: SelectChangeEvent) => {
    setFilteredCoin(event.target.value);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSelectedSort(event.target.value);
  };

  const handleFilterType = (event: SelectChangeEvent) => {
    setFilteredType(event.target.value);
  };

  const handleToggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <Box className="flex flex-col h-full">
      <Box className="block md:hidden">
        <IconButton
          sx={{ color: "var(--cp-grey-500)" }}
          onClick={handleToggleFilters}
        >
          <span className="text-sm mr-2">Filters</span> <FilterListIcon />
        </IconButton>
      </Box>
      {filtersOpen ? (
        <Box className="flex flex-col md:flex-row">
          <Box className="flex items-center px-2 md:mx-4 md:p-0 mt-4 w-full md:w-auto">
            <span className="mr-2 text-text-color text-sm w-1/3 md:w-auto">
              Filter by Coin
            </span>
            <Select
              labelId="coin-select"
              id="coin-select"
              value={filteredCoin}
              onChange={handleFilterCoin}
              className="w-2/3 md:w-[200px]"
              size="small"
            >
              <MenuItem key="allCoins" value="allCoins">
                All Coins
              </MenuItem>
              {coinNames.map((coinName) => (
                <MenuItem key={coinName} value={coinName}>
                  {coinName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="flex items-center px-2 md:mx-4 md:p-0 mt-4 w-full md:w-auto">
            <span className="mr-2 text-text-color text-sm w-1/3 md:w-auto">
              Filter by Type
            </span>
            <Select
              labelId="coin-select"
              id="coin-select"
              value={filteredType}
              onChange={handleFilterType}
              className="w-2/3 md:w-[200px]"
              size="small"
            >
              <MenuItem key="allTypes" value="allTypes">
                All Types
              </MenuItem>
              {typeOptions.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="flex items-center px-2 md:mx-4 md:p-0 mt-4 w-full md:w-auto">
            <span className="mr-2 text-text-color text-sm w-1/3 md:w-auto">
              Sort by
            </span>
            <Select
              labelId="sort-select"
              id="sort-select"
              value={selectedSort}
              onChange={handleSort}
              className="w-2/3 md:w-[200px]"
              size="small"
            >
              <MenuItem key="defaultSort" value="defaultSort">
                Default Sort
              </MenuItem>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      ) : null}

      <TransactionsTable
        transactions={filteredTransactions}
        loading={transactionsLoading}
      />
    </Box>
  );
};
