import { useEffect, useRef } from "react";
import { fmtINR, daysInMonth } from "../utils/formatters";

export default function SparklineChart({ transactions, viewDate }) {
  const canvasRef = useRef(null);
  const total = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 340, H = 70;
    canvas.width = W * 2; canvas.height = H * 2; ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);

    const days = daysInMonth(viewDate);
    const daily = Array(days).fill(0);
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const day = new Date(t.date + "T00:00:00").getDate() - 1;
        if (day >= 0 && day < days) daily[day] += t.amount;
      });

    const max = Math.max(...daily, 1);
    const pad = 10, bw = W - pad * 2, step = bw / days;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(201,168,76,0.3)");
    grad.addColorStop(1, "rgba(201,168,76,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pad, H - pad);
    daily.forEach((v, i) => {
      const x = pad + i * step + step / 2;
      const y = H - pad - (v / max) * (H - pad * 2);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(pad + days * step, H - pad);
    ctx.closePath(); ctx.fill();

    ctx.strokeStyle = "rgba(201,168,76,0.7)";
    ctx.lineWidth = 1.5; ctx.lineJoin = "round";
    ctx.beginPath();
    daily.forEach((v, i) => {
      const x = pad + i * step + step / 2;
      const y = H - pad - (v / max) * (H - pad * 2);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [transactions, viewDate]);

  return (
    <div className="sparkline-wrap">
      <div className="spark-header">
        <div className="spark-title">Daily Spending</div>
        <div className="spark-val">{fmtINR(total)} this month</div>
      </div>
      <canvas ref={canvasRef} style={{ width: "100%", height: 70 }} />
    </div>
  );
}