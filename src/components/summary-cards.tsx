"use client";

import type { DailyStats, ReporterState } from "@/lib/types";

type Props = {
  state: ReporterState;
};

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `${value.toFixed(1)}%`;
}

function getLatestDay(state: ReporterState): DailyStats | null {
  return state.daily_stats.at(-1) ?? null;
}

export function SummaryCards({ state }: Props) {
  const latest = getLatestDay(state);

  const cards = [
    {
      label: "Current Equity",
      value: latest ? formatCurrency(latest.ending_equity) : "—",
      accent: "#00f0ff",
    },
    {
      label: "Daily P&L",
      value: latest ? formatCurrency(latest.daily_pnl) : "—",
      accent: "#a855f7",
    },
    {
      label: "Win Rate",
      value: latest ? formatPercent(latest.win_rate) : "—",
      accent: "#00ff88",
    },
    {
      label: "Max Drawdown",
      value: latest ? formatPercent(latest.max_drawdown_pct) : "—",
      accent: "#ff006e",
    },
    {
      label: "Trades (total)",
      value: state.trades.length.toString(),
      accent: "#ff9500",
    },
    {
      label: "Last Updated",
      value: latest ? latest.date : "—",
      accent: "#00f0ff",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="surface-card"
          style={{ ["--accent" as string]: card.accent }}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-ghost-40">
            {card.label}
          </p>
          <p className="mt-3 text-2xl font-semibold text-ghost-100">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
