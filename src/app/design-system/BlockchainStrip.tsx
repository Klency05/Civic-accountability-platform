import { CheckCircle2, Link, Cpu } from "lucide-react";

interface BlockchainStripProps {
  blockNumber?: string;
  txHash?: string;
}

export function BlockchainStrip({
  blockNumber = "#22,847,391",
  txHash = "0x7c4f…b2e9",
}: BlockchainStripProps) {
  return (
    <div
      className="rounded-2xl p-5 flex items-center justify-between"
      style={{ background: "linear-gradient(135deg, #071A35 0%, #0B2447 50%, #163A62 100%)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-white" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
            Blockchain Transparency Enabled
          </p>
          <p className="text-[#7EB8D8] mt-0.5" style={{ fontSize: "0.75rem" }}>
            All fund transactions and issue status updates are immutably recorded on-chain.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#7EB8D8]" />
          <div className="text-right">
            <p className="text-[#7EB8D8]" style={{ fontSize: "0.6875rem" }}>Latest Block</p>
            <p className="text-white" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>
              {blockNumber}
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-white/15" />
        <div className="flex items-center gap-2">
          <Link className="w-4 h-4 text-[#7EB8D8]" />
          <div className="text-right">
            <p className="text-[#7EB8D8]" style={{ fontSize: "0.6875rem" }}>Tx Hash</p>
            <p className="text-white font-mono" style={{ fontWeight: 700, fontSize: "0.8125rem" }}>
              {txHash}
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-white/15" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400" style={{ fontWeight: 600, fontSize: "0.75rem" }}>
            Network Active
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Compact Blockchain Tag (for inline use) ──────────────────────────────────
export function ChainTag({ hash }: { hash: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE]">
      <Link className="w-3 h-3 text-[#1D4ED8]" />
      <span className="font-mono text-[#1D4ED8]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
        {hash}
      </span>
    </div>
  );
}
