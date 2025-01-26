import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Asset } from "../../shared/types";
import { VirtualisedTable } from "../virtualised-table/VirtualisedTable";
import {
  AssetName,
  AssetPrice,
  AssetQuantity,
  AssetActions,
} from "../../shared/ui";
import { enqueueSnackbar } from "notistack";

const columns = [
  {
    width: 150,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 120,
    label: "Current Price",
    dataKey: "currentPrice",
    numeric: true,
  },
  {
    width: 130,
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

export const AssetsTable = ({
  assets,
  loading,
  error,
}: {
  assets?: Asset[];
  loading: boolean;
  error: string | null;
}) => {
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
    return null;
  }

  if (!assets) {
    return (
      <VirtualisedTable
        columns={columns}
        cellStyling={() => null}
        loading={true}
        items={[]}
      />
    );
  }

  if (assets.length === 0) {
    return (
      <Box className="text-center my-8 text-text-color">
        You have no assets yet
      </Box>
    );
  }

  const cellStyling = (
    cellName: string,
    value: string,
    index: number
  ): ReactNode => {
    let component = null;

    switch (cellName) {
      case "name":
        component = (
          <AssetName
            name={value}
            symbol={assets[index].symbol}
            image={assets[index].image}
          />
        );
        break;
      case "currentPrice":
        component = <AssetPrice currentPrice={value} />;
        break;
      case "quantity":
        component = (
          <AssetQuantity
            quantity={value}
            currentPrice={assets[index].currentPrice}
          />
        );
        break;
      case "actions":
        component = <AssetActions asset={assets[index]} />;
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
      items={assets}
    />
  );
};
