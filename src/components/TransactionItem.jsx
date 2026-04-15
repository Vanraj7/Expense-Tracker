import { CATEGORIES } from "../utils/categories";
import { fmtINR } from "../utils/formatters";

export default function TransactionItem({ tx, onDelete }) {
  const cat = CATEGORIES[tx.cat] || CATEGORIES.Other;
  const sign = tx.type === "income" ? "+" : "-";
  const cls  = tx.type === "income" ? "inc" : "exp";

  return (
    <div className="tx">
      <div className="tx-ico" style={{ background: `${cat.color}18` }}>
        {cat.icon}
      </div>
      <div className="tx-body">
        <div className="tx-name">{tx.desc}</div>
        <div className="tx-meta">
          <span className="tx-badge" style={{ background: `${cat.color}18`, color: cat.color }}>
            {tx.cat}
          </span>
        </div>
        {tx.note && <div className="tx-note">{tx.note}</div>}
      </div>
      <div className="tx-right">
        <div className={`tx-amt ${cls}`}>{sign}{fmtINR(tx.amount)}</div>
        <button className="tx-del" onClick={() => onDelete(tx.id)} title="Delete">✕</button>
      </div>
    </div>
  );
}