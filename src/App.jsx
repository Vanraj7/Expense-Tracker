import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { exportToCSV } from "./utils/exportCSV";
import { useToast, ToastContainer } from "./components/Toast";

import Header            from "./components/Header";
import HeroBalance       from "./components/HeroBalance";
import QuickStats        from "./components/QuickStats";
import TransactionList   from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";
import DonutChart        from "./components/DonutChart";
import SparklineChart    from "./components/SparklineChart";
import BudgetTracker     from "./components/BudgetTracker";
import SavingsGoals      from "./components/SavingsGoals";

export default function App() {
  const [transactions, setTransactions] = useLocalStorage("vault_txs", []);
  const [budgets, setBudgets]           = useLocalStorage("vault_budgets", {});
  const [goals, setGoals]               = useLocalStorage("vault_goals", []);
  const [viewDate, setViewDate]         = useState(new Date());
  const { toasts, toast }               = useToast();

  // Filter to current month
  function monthTxs() {
    const m = viewDate.getMonth(), y = viewDate.getFullYear();
    return transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === m && d.getFullYear() === y;
    });
  }

  const mth     = monthTxs();
  const income  = mth.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = mth.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const expTxs  = mth.filter((t) => t.type === "expense");

  const daysNow = Math.min(new Date().getDate(), new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate());
  const avgPerDay = daysNow > 0 ? expense / daysNow : 0;
  const biggest   = expTxs.reduce((mx, t) => (t.amount > mx ? t.amount : mx), 0);

  function changeMonth(dir) {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + dir);
      return d;
    });
  }

  function addTransaction(tx) {
    setTransactions((prev) => [{ id: Date.now(), ...tx }, ...prev]);
    toast("Transaction added", "ok");
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast("Deleted", "err");
  }

  function setBudget(cat, amt) {
    setBudgets((prev) => ({ ...prev, [cat]: amt }));
    toast(`Budget set for ${cat}`, "ok");
  }

  function addGoal(goal) {
    setGoals((prev) => [...prev, { id: Date.now(), ...goal }]);
    toast("Goal created!", "ok");
  }

  function deleteGoal(id) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  function handleExport() {
    const ok = exportToCSV(mth, viewDate);
    ok ? toast("CSV exported", "ok") : toast("No data to export", "err");
  }

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      </div>

      <div className="app">
        <Header viewDate={viewDate} onChangeMonth={changeMonth} onExport={handleExport} />

        <div className="body-grid">
          {/* ── MAIN COLUMN ── */}
          <div className="main-col">
            <HeroBalance income={income} expense={expense} txCount={mth.length} />
            <QuickStats avgPerDay={avgPerDay} biggestExpense={biggest} txCount={mth.length} />
            <TransactionList transactions={mth} onDelete={deleteTransaction} />
          </div>

          {/* ── SIDE COLUMN ── */}
          <div className="side-col">
            <AddTransactionForm onAdd={addTransaction} />
            <DonutChart expenseTxs={expTxs} />
            <SparklineChart transactions={mth} viewDate={viewDate} />
            <BudgetTracker budgets={budgets} onSetBudget={setBudget} expenseTxs={expTxs} />
            <SavingsGoals goals={goals} onAdd={addGoal} onDelete={deleteGoal} />
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </>
  );
}