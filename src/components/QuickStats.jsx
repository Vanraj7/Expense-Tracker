import { fmtINR } from "../utils/formatters";

export default function QuickStats({ avgPerDay, biggestExpense, txCount }) {
  return (
    <div className="quick-stats">
      <div className="qs-card">
        <div className="qs-icon">📊</div>
        <div className="qs-val">{fmtINR(avgPerDay)}</div>
        <div className="qs-label">Avg. per day</div>
      </div>
      <div className="qs-card">
        <div className="qs-icon">🔥</div>
        <div className="qs-val">{fmtINR(biggestExpense)}</div>
        <div className="qs-label">Biggest expense</div>
      </div>
      <div className="qs-card">
        <div className="qs-icon">📅</div>
        <div className="qs-val">{txCount}</div>
        <div className="qs-label">Transactions</div>
      </div>
    </div>
  );
}