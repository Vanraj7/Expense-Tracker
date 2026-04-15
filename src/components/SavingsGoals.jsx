import { useState } from "react";
import { fmtINR } from "../utils/formatters";

export default function SavingsGoals({ goals, onAdd, onDelete }) {
  const [open, setOpen]     = useState(false);
  const [name, setName]     = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved]   = useState("");

  function handleAdd() {
    if (!name.trim() || !target || parseFloat(target) <= 0) return;
    onAdd({ name: name.trim(), target: parseFloat(target), saved: parseFloat(saved) || 0 });
    setName(""); setTarget(""); setSaved(""); setOpen(false);
  }

  return (
    <div className="form-glass">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div className="side-section-label" style={{ marginBottom: 0 }}>Savings Goals</div>
        <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", color: "var(--gold2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--sans)" }}>
          + Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div style={{ fontSize: 12, color: "var(--muted)" }}>No goals yet. Add one above.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {goals.map((g) => {
            const pct = Math.min((g.saved / g.target) * 100, 100);
            return (
              <div className="goal-card" key={g.id}>
                <div className="goal-top">
                  <div className="goal-name">{g.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="goal-pct">{pct.toFixed(0)}%</div>
                    <button className="goal-del" onClick={() => onDelete(g.id)}>✕</button>
                  </div>
                </div>
                <div className="goal-track"><div className="goal-fill" style={{ width: `${pct}%` }} /></div>
                <div className="goal-bottom">
                  <span>{fmtINR(g.saved)} saved</span>
                  <span>{fmtINR(g.target - g.saved)} to go</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">New Savings Goal</div>
              <button className="modal-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="fgroup">
              <label className="flabel">Goal Name</label>
              <input className="finput" placeholder="e.g. New Laptop, Trip to Goa" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="frow">
              <div className="fgroup">
                <label className="flabel">Target (₹)</label>
                <input className="finput" type="number" placeholder="50000" value={target} onChange={(e) => setTarget(e.target.value)} />
              </div>
              <div className="fgroup">
                <label className="flabel">Saved so far (₹)</label>
                <input className="finput" type="number" placeholder="0" value={saved} onChange={(e) => setSaved(e.target.value)} />
              </div>
            </div>
            <button className="submit-btn" onClick={handleAdd}>Create Goal</button>
          </div>
        </div>
      )}
    </div>
  );
}