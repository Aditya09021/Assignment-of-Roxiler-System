import React, { useState } from "react";
import Statistics from "./Statistics";
import TransactionsTable from "./TransactionsTable";
import BarChart from "./BarChart";
import "./Dashboard.css";

const Dashboard = () => {
  const [month, setMonth] = useState("03"); // Default: March

  return (
    <div className="dashboard-container">
      <h1>Transactions Dashboard</h1>
      <div className="month-selector">
        <label>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <Statistics month={month} />
      <TransactionsTable month={month} />
      <BarChart month={month} />
    </div>
  );
};

export default Dashboard;
