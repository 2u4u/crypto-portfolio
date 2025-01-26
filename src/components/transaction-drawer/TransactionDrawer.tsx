import { Box, IconButton, Typography, Drawer } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useModalStore, useTransactionForm } from "../../shared/store";
import { CoinSelector } from "../coin-selector/CoinSelector";
import { TransactionForm } from "../transaction-form/TransactionForm";

export const TransactionDrawer = () => {
  const { isTransactionFormOpen, setTransactionFormClose } = useModalStore();
  const { transactionId } = useTransactionForm();

  return (
    <Drawer
      open={isTransactionFormOpen}
      onClose={setTransactionFormClose}
      anchor="right"
    >
      <Box className="bg-grey-100 h-full w-full max-w-[600px] p-8 flex flex-col">
        <Box className="flex justify-between mb-5">
          <Typography component="h2">
            {transactionId ? "Edit" : "Add"} transaction
          </Typography>
          <IconButton
            aria-label="close"
            sx={{ color: "var(--cp-grey-500)", m: "-8px" }}
            onClick={setTransactionFormClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <TransactionForm />
      </Box>
      <CoinSelector />
    </Drawer>
  );
};
