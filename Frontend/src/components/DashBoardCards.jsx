export default function DashBoardCards({ summary }) {
  return (
    <div className="cards">
      <div className="card income-card">
        <h3>Total Income</h3>
        <h2>₹{summary.income}</h2>
      </div>

      <div className="card expense-card">
        <h3>Total Expense</h3>
        <h2>₹{summary.expense}</h2>
      </div>

      <div className="card balance-card">
        <h3>Balance</h3>
        <h2>₹{summary.balance}</h2>
      </div>
    </div>
  );
}