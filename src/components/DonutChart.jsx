import { useEffect, useRef } from "react";
import { CATEGORIES } from "../utils/categories";
import { fmtINR, fmtK } from "../utils/formatters";

export default function DonutChart({ expenseTxs }) {
  const canvasRef = useRef(null);

  const totals = {};
  expenseTxs.forEach((t) => { totals[t.cat] = (totals[t.cat] || 0) + t.amount; });
  const total = Object.values(totals).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    if (total === 0) {
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 12;
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 42, 0, Math.PI * 2); ctx.stroke();
      return;
    }

    let startAngle = -Math.PI / 2;
    const GAP = 0.05;
    sorted.forEach(([cat, val]) => {
      const slice = (val / total) * Math.PI * 2;
      const color = (CATEGORIES[cat] || CATEGORIES.Other).color;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 46, startAngle + GAP / 2, startAngle + slice - GAP / 2);
      ctx.arc(W / 2, H / 2, 26, startAngle + slice - GAP / 2, startAngle + GAP / 2, true);
      ctx.closePath();
      ctx.fillStyle = color; ctx.fill();
      startAngle += slice;
    });

    ctx.fillStyle = "rgba(245,224,160,0.9)";
    ctx.font = "bold 11px DM Mono, monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("₹" + fmtK(total), W / 2, H / 2);
  }, [expenseTxs]);

  return (
    <div className="form-glass">
      <div className="side-section-label">Expense Breakdown</div>
      <div className="donut-wrap">
        <canvas ref={canvasRef} width={120} height={120} />
        <div className="donut-legend">
          {total === 0 ? (
            <div style={{ fontSize: 12, color: "var(--muted)" }}>No expenses yet</div>
          ) : (
            sorted.slice(0, 5).map(([cat, val]) => {
              const c = (CATEGORIES[cat] || CATEGORIES.Other).color;
              return (
                <div className="legend-row" key={cat}>
                  <div className="legend-dot" style={{ background: c }} />
                  <div className="legend-name">{cat}</div>
                  <div className="legend-pct">{((val / total) * 100).toFixed(0)}%</div>
                  <div className="legend-val">{fmtINR(val)}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}