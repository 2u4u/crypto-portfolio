import { ReactNode } from "react";
import Big from "big.js";
import { Box } from "@mui/material";
import { Paid as PaidIcon } from "@mui/icons-material";
import { Transaction } from "../../shared/types";
import { VirtualisedTable } from "../virtualised-table/VirtualisedTable";
import { CoinName, TransactionTableActions } from "../../shared/ui";
import {
  useModalStore,
  useTransactionForm,
  useTransactionsStore,
} from "../../shared/store";
import { transactionService } from "../../shared/api";

const columns = [
  {
    width: 100,
    label: "Type",
    dataKey: "type",
  },
  {
    width: 100,
    label: "Coin",
    dataKey: "coinName",
  },
  {
    width: 100,
    label: "Price",
    dataKey: "price",
    numeric: true,
  },
  {
    width: 110,
    label: "Quantity",
    dataKey: "quantity",
    numeric: true,
  },
  {
    width: 20,
    label: "Actions",
    dataKey: "actions",
    numeric: true,
  },
];

export const TransactionsTable = ({
  transactions,
  loading,
}: {
  transactions?: Transaction[];
  loading: boolean;
}) => {
  const { setTransactionFormOpen } = useModalStore();
  const { setTransactionId } = useTransactionForm();
  const { getTransactions } = useTransactionsStore();

  if (!transactions) {
    return (
      <VirtualisedTable
        columns={columns}
        cellStyling={() => null}
        loading={true}
        items={[]}
      />
    );
  }

  if (transactions.length === 0) {
    return (
      <Box className="text-center my-8 text-text-color">
        You have no transactions yet
      </Box>
    );
  }

  const handleEdit = (id: string) => {
    setTransactionId(id);
    setTransactionFormOpen();
  };

  const handleDelete = async (id: string) => {
    await transactionService.delete("transaction", id);
    await getTransactions();
  };

  const cellStyling = (
    cellName: string,
    value: string,
    index: number
  ): ReactNode => {
    let component = null;

    switch (cellName) {
      case "coinName":
        component = (
          <CoinName name={value} symbol={transactions[index].coinSymbol} />
        );
        break;
      case "type":
        component = (
          <Box className="flex items-center">
            <span
              className={`${
                value === "buy" ? "text-positive" : "text-negative"
              } mr-2`}
            >
              <PaidIcon />
            </span>
            <span className="capitalize font-medium">{value}</span>
          </Box>
        );
        break;
      case "price":
        component = <Box>${Number(value).toFixed(6)}</Box>;
        break;
      case "quantity":
        component = (
          <Box className="flex flex-col">
            <span
              className={`${
                transactions[index].type === "buy"
                  ? "text-positive"
                  : "text-negative"
              } text-sm font-medium`}
            >
              {transactions[index].type === "buy" ? "+" : "-"}{" "}
              {Number(value).toFixed(2)}
            </span>
            <span className="text-xs">
              $
              {String(
                new Big(Number(value)).times(Number(transactions[index].price))
              )}
            </span>
          </Box>
        );
        break;
      case "actions":
        component = (
          <TransactionTableActions
            id={transactions[index].id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
        break;
      default:
        break;
    }

    return component;
  };

  return (
    <VirtualisedTable
      columns={columns}
      cellStyling={cellStyling}
      loading={loading}
      items={transactions}
    />
  );
};
