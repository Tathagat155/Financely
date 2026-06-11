import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function TransactionModal({ setOpenModal, fetchTransactions }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", formData);

      toast.success("Transaction Added");

      fetchTransactions();

      setOpenModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>

            <option value="expense">Expense</option>
          </select>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionModal;
