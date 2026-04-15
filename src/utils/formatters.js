export function fmtINR(amount) {
  return "₹" + Math.abs(amount).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function fmtDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export function fmtMonthYear(date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export function fmtK(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : Math.round(n).toString();
}

export function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}