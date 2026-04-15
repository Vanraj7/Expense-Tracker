import { useState } from "react";
import { ALL_CATS } from "../utils/categories";

const today = new Date().toISOString().split("T")[0];

export default function AddTransactionForm({ onAdd }) {
  const [type, setType]   = useState("expense");
  const [amt, setAmt]     = useState("");
  const [date, setDate]   = useState(today);
  const [desc, setDesc]   = useState("");
  const [cat, setCat]     = useState("Food");
  const [note, setNote]   = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!desc.trim()) e.desc = true;
    if (!amt || parseFloat(amt) <= 0) e.amt = true;
    if (!date) e.date = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onAdd({ desc: desc.trim(), amount: parseFloat(amt), cat, date, note: note.trim(), type });
    setAmt(""); setDesc(""); setNote("");
    setErrors({});
  }

  function handleTypeChange(t) {
    setType(t);
    setCat(t === "income" ? "Salary" : "Food");
  }

  return (
    <div className="form-glass">
      <div className="form-hdr">
        <div className="form-hdr-icon">＋</div>
        <div className="form-hdr-title">New Transaction</div>
      </div>

      <div className="type-toggle">
        <button className={`tt-btn${type === "expense" ? " ae" : ""}`} onClick={() => handleTypeChange("expense")}>
          ↑ Expense
        </button>
        <button className={`tt-btn${type === "income" ? " ai" : ""}`} onClick={() => handleTypeChange("income")}>
          ↓ Income
        </button>
      </div>

      <div className="frow">
        <div className="fgroup">
          <label className="flabel">Amount (₹)</label>
          <input
            className={`finput${errors.amt ? " error" : ""}`}
            type="number" min="0" step="0.01" placeholder="0.00"
            value={amt} onChange={(e) => setAmt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <div className="fgroup">
          <label className="flabel">Date</label>
          <input
            className={`finput${errors.date ? " error" : ""}`}
            type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="fgroup">
        <label className="flabel">Description</label>
        <input
          className={`finput${errors.desc ? " error" : ""}`}
          placeholder="What was this for?"
          value={desc} onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      <div className="frow">
        <div className="fgroup">
          <label className="flabel">Category</label>
          <select className="fselect" value={cat} onChange={(e) => setCat(e.target.value)}>
            {ALL_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="fgroup">
          <label className="flabel">Note (optional)</label>
          <input className="finput" placeholder="Extra detail…" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Add to Vault</button>
    </div>
  );
}