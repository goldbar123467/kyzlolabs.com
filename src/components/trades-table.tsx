"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ReporterState, TradeRecord } from "@/lib/types";

type Props = {
  state: ReporterState;
};

const columnHelper = createColumnHelper<TradeRecord>();

const columns = [
  columnHelper.accessor("timestamp", {
    header: "Time",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.accessor("symbol", { header: "Symbol" }),
  columnHelper.accessor("side", {
    header: "Side",
    cell: (info) => info.getValue().toUpperCase(),
  }),
  columnHelper.accessor("pnl", {
    header: "P&L",
    cell: (info) => {
      const val = info.getValue();
      const positive = val >= 0;
      return (
        <span className={positive ? "text-emerald-300" : "text-rose-300"}>
          {val >= 0 ? "+" : ""}
          {val.toFixed(2)}
        </span>
      );
    },
  }),
  columnHelper.accessor("pnl_pct", {
    header: "Return",
    cell: (info) => {
      const val = info.getValue();
      const positive = val >= 0;
      return (
        <span className={positive ? "text-emerald-300" : "text-rose-300"}>
          {val >= 0 ? "+" : ""}
          {val.toFixed(2)}%
        </span>
      );
    },
  }),
  columnHelper.accessor("exit_reason", { header: "Reason" }),
];

export function TradesTable({ state }: Props) {
  const table = useReactTable({
    data: state.trades.slice(-20).reverse(), // latest first
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="surface-panel">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ghost-40">
            Recent Trades
          </p>
          <h2 className="text-lg font-semibold text-ghost-100">Last 20</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-void text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="font-medium text-ghost-60">
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header?.toString()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-ghost-80">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {!table.getRowModel().rows.length && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-4 text-ghost-60"
                >
                  No trades yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
