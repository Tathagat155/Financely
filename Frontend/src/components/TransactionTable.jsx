import API from "../api/axios";
import { toast } from "react-toastify";

function TransactionTable({ transactions, fetchTransactions,fetchSummary,token }) {
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);

      toast.success("Deleted Successfully");

      fetchTransactions();
      fetchSummary();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
           {token && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>

              <td>₹{item.amount}</td>

              <td>{item.type}</td>

              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
           {token && 
              (<td>
                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(item._id)}
                >
                  Delete
                </button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
