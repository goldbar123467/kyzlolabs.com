export const revalidate = 300;

import { BackdropToggle } from "@/components/backdrop-toggle";
import { EquityChart } from "@/components/equity-chart";
import { SummaryCards } from "@/components/summary-cards";
import { TradesTable } from "@/components/trades-table";
import { loadState } from "@/lib/stateService";

export default async function Home() {
  const state = await loadState();

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-ghost-80">
      <div className="void-gradient" />
      <div className="void-mesh" />
      <div className="void-grid" />
      <div className="void-noise" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10">
        <header className="flex flex-col gap-4">
          <p className="overline">Void Protocol · Mission Control</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h1 className="void-hero">KYZLO Bot Dashboard</h1>
              <p className="void-body max-w-3xl">
                Live telemetry for equity, drawdowns, and trade flow rendered
                through the VOID aesthetic. The darkness is potential—every
                signal emerges from it.
              </p>
            </div>
            <div className="self-start md:self-auto">
              <BackdropToggle />
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          <SummaryCards state={state} />
          <EquityChart state={state} />
          <TradesTable state={state} />
        </div>
      </div>
    </main>
  );
}
