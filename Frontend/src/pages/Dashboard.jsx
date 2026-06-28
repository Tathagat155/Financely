import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashBoardCards";
import TransactionModal from "../components/TransactionModal";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

 const { token, setToken } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [type, setType] = useState("");

  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await API.get(
        `/transactions?search=${search}&type=${type}&sort=${sort}&page=${page}&limit=5`,
      );

      setTransactions(res.data.transactions);

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [search, type, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, type, sort]);

  return (
    <>
      <Navbar/>

      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <p>Manage your income and expenses</p>
        </div>

        <DashboardCards transactions={transactions} />

        {token && (
          <div className="search-row">
            <input
              type="text"
              placeholder="Search Transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <button className="add-btn" onClick={() => setOpenModal(true)}>
              + Add Transaction
            </button>
          </div>
        )}
        <div className="table-header">
          <h2>My Transactions</h2>

          <div className="table-controls">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Latest</option>

              <option value="oldest">Oldest</option>

              <option value="high">Amount High</option>

              <option value="low">Amount Low</option>
            </select>
          </div>
        </div>

        <TransactionTable
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          token={token}
        />

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />

        {openModal && (
          <TransactionModal
            setOpenModal={setOpenModal}
            fetchTransactions={fetchTransactions}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
