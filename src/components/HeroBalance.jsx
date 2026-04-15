import { fmtINR } from "../utils/formatters";

export default function HeroBalance({ income, expense, txCount }) {
  const balance = income - expense;
  return (
    <div className="hero">
      <div className="hero-decor" />
      <div className="hero-decor2" />
      <div className="hero-label">Net Balance</div>
      <div className={`hero-balance ${balance >= 0 ? "pos" : "neg"}`}>
        {fmtINR(balance)}
      </div>
      <div className="hero-sub">
        {txCount > 0 ? `${txCount} transaction${txCount !== 1 ? "s" : ""} this month` : "No transactions this month"}
      </div>
      <div className="hero-pills">
        <div className="hero-pill pill-inc">
          <div className="pill-dot" style={{ background: "#4ade80" }} />
          <span>Income: <strong>{fmtINR(income)}</strong></span>
        </div>
        <div className="hero-pill pill-exp">
          <div className="pill-dot" style={{ background: "#f87171" }} />
          <span>Expenses: <strong>{fmtINR(expense)}</strong></span>
        </div>
      </div>
    </div>
  );
}