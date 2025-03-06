import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
    .get("http://localhost:5000/transactions") // Make sure this is correct
    .then((response) => setTransactions(response.data))
    .catch((error) => console.error("Error fetching transactions:", error));  
  }, [month, page]);
  

  return (
    <div className="transactions-table">
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
  {transactions.length > 0 ? (
    transactions.map((transaction) => (
      <tr key={transaction.id}>
        <td>{transaction.id}</td>
        <td>{transaction.title}</td>
        <td>{transaction.description}</td>
        <td>₹{transaction.price}</td>
        <td>{transaction.category}</td>
        <td>{transaction.sold ? "✅" : "❌"}</td>
        <td>
          {transaction.image ? (
            <img
              src={transaction.image}
              alt={transaction.title}
              className="transaction-image"
            />
          ) : (
            "No Image"
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No transactions found</td>
    </tr>
  )}
</tbody>

      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
