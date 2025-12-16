"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { ReporterState } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type Props = { state: ReporterState };

export function EquityChart({ state }: Props) {
  if (!state.daily_stats.length) {
    return (
      <div className="surface-panel text-ghost-60">No equity data yet.</div>
    );
  }

  const labels = state.daily_stats.map((d) => d.date);
  const equity = state.daily_stats.map((d) => d.ending_equity);
  const peak = equity.reduce<number[]>((acc, val, idx) => {
    if (idx === 0) return [val];
    acc.push(Math.max(acc[idx - 1], val));
    return acc;
  }, []);
  const drawdown = equity.map(
    (val, idx) => ((val - peak[idx]) / peak[idx]) * 100,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Equity",
        data: equity,
        borderColor: "#00f0ff",
        backgroundColor: "rgba(0, 240, 255, 0.12)",
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
      {
        label: "Drawdown (%)",
        data: drawdown,
        yAxisID: "y1",
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.12)",
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

  const axisColor = "rgba(255,255,255,0.6)";

  const options = {
    responsive: true,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        labels: {
          color: axisColor,
          boxWidth: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(26,26,36,0.92)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        titleColor: "#ffffff",
        bodyColor: "#e6e6e6",
      },
    },
    scales: {
      x: {
        ticks: { color: axisColor },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
      y: {
        ticks: { color: axisColor },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
      y1: {
        position: "right" as const,
        ticks: {
          color: "#a855f7",
          callback: (value: number | string) => `${value}%`,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="surface-panel">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ghost-40">
            Performance
          </p>
          <h2 className="text-lg font-semibold text-ghost-100">
            Equity & Drawdown
          </h2>
        </div>
      </div>
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
