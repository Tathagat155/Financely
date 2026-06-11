function DashboardCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="cards">
      <div className="card income-card">
        <h3>Total Income</h3>
        <h2>₹{income}</h2>
      </div>

      <div className="card expense-card">
        <h3>Total Expense</h3>
        <h2>₹{expense}</h2>
      </div>

      <div className="card balance-card">
        <h3>Balance</h3>
        <h2>₹{balance}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;
