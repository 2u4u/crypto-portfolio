import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Asset {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  quantity: number;
  image: string;
}

interface AssetDoughnutChartProps {
  assets: Asset[];
}

export const AllocationGraph: React.FC<AssetDoughnutChartProps> = ({
  assets,
}) => {
  const portfolioValue = assets.reduce(
    (total, asset) => total + asset.currentPrice * asset.quantity,
    0
  );

  const chartData = {
    labels: assets.map((asset) => asset.symbol.toUpperCase()),
    datasets: [
      {
        data: assets.map(
          (asset) =>
            ((asset.currentPrice * asset.quantity) / portfolioValue) * 100
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const asset = assets[context.dataIndex];
            return ` ${asset.symbol.toUpperCase()}: ${
              context.formattedValue
            }%(${(asset.currentPrice * asset.quantity).toLocaleString()})`;
          },
        },
      },
    },
  };

  return (
    <Box className="h-full">
      <Doughnut data={chartData} options={options} />
    </Box>
  );
};
