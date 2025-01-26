import { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Big from "big.js";
import { enqueueSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  TextField,
  Button,
  Grid2 as Grid,
  InputAdornment,
} from "@mui/material";
import {
  useAssetsStore,
  useModalStore,
  useTransactionForm,
  useTransactionsStore,
} from "../../shared/store";
import { coinsService, transactionService } from "../../shared/api";
import { CoinSelectorButton, InputLabel, Loading } from "../../shared/ui";

const validationSchema = yup.object({
  quantity: yup.string().required("Quantity is required"),
  price: yup.string().required("Price is required"),
  coinId: yup.string().required("Coin should be selected"),
});

export const TransactionForm = () => {
  const { setTransactionFormClose } = useModalStore();
  const { selectedCoin, transaction, transactionId, transactionLoading } =
    useTransactionForm();
  const { getTransactions } = useTransactionsStore();
  const { getAssets } = useAssetsStore();

  const [type, setType] = useState("buy");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCoin, setLoadingCoin] = useState(false);

  useEffect(() => {
    if (selectedCoin?.id) {
      const fetchCoinById = async () => {
        setLoadingCoin(true);
        try {
          const coin = await coinsService.readOne(selectedCoin.id);
          if (coin?.market_data?.current_price?.usd) {
            setPrice(coin.market_data.current_price.usd);
          }
        } catch (error: any) {
          enqueueSnackbar(error, { variant: "error" });
        } finally {
          setLoadingCoin(false);
        }
      };
      fetchCoinById();
    }
  }, [selectedCoin]);

  const formik = useFormik({
    initialValues: {
      quantity: "",
      price: "",
      coinId: "",
      coinName: "",
      coinSymbol: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (transactionId) {
        await transactionService.update("transaction", transactionId, {
          ...values,
          type,
          timestamp: new Date().toISOString(),
        });
      } else {
        await transactionService.create("transaction", {
          ...values,
          type,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
        });
      }
      await getTransactions();
      await getAssets();
      setTransactionFormClose();
      setIsLoading(false);
      formik.setValues({
        quantity: "",
        price: "",
        coinId: "",
        coinName: "",
        coinSymbol: "",
      });
    },
  });

  useEffect(() => {
    if (transaction) {
      formik.setValues(transaction);
    }
  }, [transaction]);

  useEffect(() => {
    formik.setFieldValue("price", price);
  }, [price]);

  useEffect(() => {
    formik.setFieldValue("coinId", selectedCoin?.id);
    formik.setFieldValue("coinName", selectedCoin?.name);
    formik.setFieldValue("coinSymbol", selectedCoin?.symbol);
  }, [selectedCoin]);

  const handleChangeType = (_: MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  const handleChangeInput =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const filteredValue = e.target.value.replace(/\D/g, "");

      formik.setFieldValue(field, filteredValue);
    };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={formik.handleSubmit}
    >
      <Box>
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleChangeType}
          aria-label="transaction type"
          className="w-full mb-5"
          size="small"
        >
          <ToggleButton value="buy" disabled={isLoading || transactionLoading}>
            Buy
          </ToggleButton>
          <ToggleButton value="sell" disabled={isLoading || transactionLoading}>
            Sell
          </ToggleButton>
        </ToggleButtonGroup>
        <CoinSelectorButton
          selectedCoin={selectedCoin}
          errorText={formik.errors.coinId}
          error={formik.submitCount > 0}
          disabled={isLoading || transactionLoading}
        />
        <Grid container spacing={2} className="mb-5">
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>Quantity</InputLabel>
              <TextField
                disabled={isLoading || transactionLoading}
                id="quantity"
                name="quantity"
                placeholder="0.00"
                variant="outlined"
                value={formik.values.quantity}
                onChange={handleChangeInput("quantity")}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
                slotProps={{
                  input: {
                    endAdornment: transactionLoading ? (
                      <InputAdornment position="end">
                        <Loading size={16} />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end"> </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>Price Per Coin</InputLabel>
              <TextField
                disabled={isLoading || loadingCoin || transactionLoading}
                id="price"
                name="price"
                placeholder="0.00"
                variant="outlined"
                value={formik.values.price}
                onChange={handleChangeInput("price")}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    endAdornment:
                      loadingCoin || transactionLoading ? (
                        <InputAdornment position="end">
                          <Loading size={16} />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end"> </InputAdornment>
                      ),
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box className="bg-grey-200 rounded-md p-4 text-text-color mb-5 select-none">
          <InputLabel>Total {type === "buy" ? "Spent" : "Received"}</InputLabel>
          <Typography sx={{ fontSize: 24 }}>
            ${" "}
            {formik.values.quantity && formik.values.price
              ? String(
                  new Big(formik.values.quantity).times(formik.values.price)
                )
              : 0}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        size="large"
        type="submit"
        disabled={isLoading}
      >
        {isLoading || transactionLoading ? (
          <Box className="flex items-center justify-center">
            <span>Loading</span>
            <Loading size={20} color="var(--cp-text-color)" />
          </Box>
        ) : (
          <span>{transactionId ? "Edit" : "Add"} Transaction</span>
        )}
      </Button>
    </form>
  );
};
