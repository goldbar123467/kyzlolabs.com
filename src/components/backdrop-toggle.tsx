"use client";

import { useEffect, useState } from "react";

export function BackdropToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("voidAmbient");
    if (stored === "on") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("voidAmbient", enabled ? "on" : "off");
  }, [enabled]);

  return (
    <div className="flex items-center gap-2 text-sm text-ghost-80">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled((v) => !v)}
          className="h-4 w-4 accent-cyan-300"
        />
        Ambient grid & glow
      </label>
      {!enabled && <span className="text-xs text-ghost-60">(muted)</span>}
      <style jsx global>{`
        :root {
          --ambient-enabled: ${enabled ? "1" : "0"};
        }
      `}</style>
    </div>
  );
}
