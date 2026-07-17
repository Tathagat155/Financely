import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashBoardCards";
import TransactionModal from "../components/TransactionModal";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";

function Dashboard({token,setToken}) {

  const [transactions, setTransactions] = useState([]);
 const [summary, setSummary] = useState({
  income: 0,
  expense: 0,
  balance: 0,
  });

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
  const fetchSummary = async () => {
  try {
    const res = await API.get(
      "/transactions/summary"
    );

    setSummary(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const handleSearchChange = (value) => {
    setPage(1);
    setSearch(value);
  };

  const handleTypeChange = (value) => {
    setPage(1);
    setType(value);
  };

  const handleSortChange = (value) => {
    setPage(1);
    setSort(value);
  };
  useEffect(() => {
    fetchTransactions();
  }, [search, type, sort, page]);
  useEffect(()=>{
     fetchSummary();
  },[])

  return (
    <>
      <Navbar token={token} setToken={setToken}/>

      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your income and expenses</p>
        </div>

        <DashboardCards summary={summary} />

         {token && ( <div className="search-row">
            <input
              type="text"
              placeholder="Search Transactions"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
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
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="">All</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>

            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
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
          fetchSummary={fetchSummary}
          token={token}
        />

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />

        {openModal && (
          <TransactionModal
            setOpenModal={setOpenModal}
            fetchTransactions={fetchTransactions}
            fetchSummary={fetchSummary}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
