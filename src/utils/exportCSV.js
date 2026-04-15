export function exportToCSV(transactions, viewDate) {
  if (!transactions.length) return false;
  const rows = [["Date", "Description", "Category", "Type", "Amount", "Note"]];
  transactions.forEach((t) =>
    rows.push([t.date, t.desc, t.cat, t.type, t.amount, t.note || ""])
  );
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = `vault_${viewDate.toISOString().slice(0, 7)}.csv`;
  a.click();
  return true;
}