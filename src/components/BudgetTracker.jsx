import { useState } from "react";
import { CATEGORIES, EXPENSE_CATS } from "../utils/categories";
import { fmtINR } from "../utils/formatters";

export default function BudgetTracker({ budgets, onSetBudget, expenseTxs }) {
  const [cat, setCat] = useState("Food");
  const [amt, setAmt] = useState("");

  const spent = {};
  expenseTxs.forEach((t) => { spent[t.cat] = (spent[t.cat] || 0) + t.amount; });

  function handleSet() {
    const v = parseFloat(amt);
    if (!v || v <= 0) return;
    onSetBudget(cat, v);
    setAmt("");
  }

  return (
    <div className="form-glass">
      <div className="side-section-label">Category Budgets</div>
      <div className="budget-form">
        <select className="fselect" value={cat} onChange={(e) => setCat(e.target.value)} style={{ fontSize: 12, padding: "8px 10px" }}>
          {EXPENSE_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          className="finput" type="number" placeholder="₹ limit"
          value={amt} onChange={(e) => setAmt(e.target.value)}
          style={{ fontSize: 12, padding: "8px 10px" }}
          onKeyDown={(e) => e.key === "Enter" && handleSet()}
        />
        <button className="budget-add-btn" onClick={handleSet}>Set</button>
      </div>

      {Object.keys(budgets).length === 0 ? (
        <div style={{ fontSize: 12, color: "var(--muted)" }}>Set a budget per category above.</div>
      ) : (
        Object.entries(budgets).map(([c, limit]) => {
          const s = spent[c] || 0;
          const pct = Math.min((s / limit) * 100, 100);
          const over = s > limit;
          const color = (CATEGORIES[c] || CATEGORIES.Other).color;
          const icon  = (CATEGORIES[c] || CATEGORIES.Other).icon;
          return (
            <div className="budget-row" key={c}>
              <div className="brow-top">
                <div className="brow-cat"><span>{icon}</span>{c}</div>
                <div className="brow-vals" style={{ color: over ? "var(--red)" : "var(--muted)" }}>
                  {fmtINR(s)} / {fmtINR(limit)}
                </div>
              </div>
              <div className="brow-track">
                <div className="brow-fill" style={{ width: `${pct}%`, background: over ? "var(--red)" : color }} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}