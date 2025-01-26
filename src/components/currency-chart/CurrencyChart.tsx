import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { AssetMarketChart } from "../../shared/types";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  CategoryScale,
  LinearScale
);

const CurrencyChart: React.FC<{ data: AssetMarketChart }> = ({ data }) => {
  const chartRef = useRef(null);
  const [hoverData, setHoverData] = useState<{
    date: string;
    rate: number;
  } | null>(null);
  const [mousePos, setMousePos] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const labels = data.prices.map(([timestamp]: [number, number]) =>
    new Date(timestamp).toLocaleDateString()
  );
  const values = data.prices.map(([, price]: [number, number]) => price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: values,
        borderColor: "white",
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        segment: {
          borderColor: (ctx: { p1DataIndex: number; p2DataIndex: number }) =>
            ctx.p1DataIndex > (hoverIndex ?? -1) ? "grey" : "white",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (context: any) => {
          const chart = chartRef.current;
          if (!chart) return;

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            setHoverData(null);
            setMousePos({ x: null, y: null });
            setHoverIndex(null);
            return;
          }

          const index = tooltipModel.dataPoints[0].dataIndex;
          const xPosition = tooltipModel.caretX;
          const yPosition = tooltipModel.caretY;

          setHoverData({
            date: labels[index],
            rate: values[index],
          });
          setMousePos({ x: xPosition, y: yPosition });
          setHoverIndex(index);
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: (context: any) =>
            context.index % 10 === 0
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.05)",
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
          color: "rgba(255,255,255,0.5)",
          font: {
            size: 10,
          },
          stepSize: 10,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: (context: any) =>
            context.index % 10 === 0
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.05)",
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 5,
          color: "rgba(255,255,255,0.5)",
          font: {
            size: 10,
          },
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "200px", width: "100%" }}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <Line ref={chartRef} data={chartData} options={options} />

      {mousePos.x !== null && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${mousePos.x}px`,
            height: "100%",
            width: "1px",
            backgroundColor: "white",
            pointerEvents: "none",
            transform: "translateX(-50%)",
          }}
        />
      )}

      {mousePos.y !== null && (
        <div
          style={{
            position: "absolute",
            top: `${mousePos.y}px`,
            left: "0",
            width: "100%",
            height: "1px",
            backgroundColor: "white",
            pointerEvents: "none",
          }}
        />
      )}

      {mousePos.x !== null && mousePos.y !== null && (
        <div
          style={{
            position: "absolute",
            top: `${mousePos.y}px`,
            left: `${mousePos.x}px`,
            width: "8px",
            height: "8px",
            backgroundColor: "white",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      )}

      {hoverData && (
        <div
          style={{
            position: "absolute",
            top: `0px`,
            left: `${mousePos.x! + 10}px`,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            fontSize: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{hoverData.rate.toFixed(6)}</span>
          <span>{hoverData.date}</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyChart;
