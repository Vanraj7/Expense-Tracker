import { useState } from "react";
import TransactionItem from "./TransactionItem";
import { fmtDate } from "../utils/formatters";
import { CATEGORIES } from "../utils/categories";

const ALL_FILTERS = ["All", "Food", "Transport", "Shopping", "Health", "Bills", "Entertainment", "Salary", "Freelance", "Investment", "Other"];

export default function TransactionList({ transactions, onDelete }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = transactions.filter((t) => {
    const matchCat = activeFilter === "All" || t.cat === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // Group by date
  const groups = {};
  filtered.forEach((t) => {
    if (!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });
  const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <div className="sec-label" style={{ marginBottom: "1rem" }}>
        <div className="sec-title">Transactions</div>
      </div>

      <div className="search-bar" style={{ marginBottom: 10 }}>
        <span className="search-icon">⊕</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category…"
        />
      </div>

      <div className="chips">
        {ALL_FILTERS.map((cat) => {
          const catData = CATEGORIES[cat];
          const label = catData ? `${catData.icon} ${cat}` : cat;
          return (
            <button
              key={cat}
              className={`chip${activeFilter === cat ? " on" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="tx-list">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-glyph">◈</div>
            <div className="empty-txt">No transactions found.<br />Add one using the form →</div>
          </div>
        ) : (
          sortedDates.map((date) => (
            <div key={date}>
              <div className="tx-group-label">{fmtDate(date)}</div>
              {groups[date].map((tx) => (
                <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}