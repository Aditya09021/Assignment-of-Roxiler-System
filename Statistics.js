import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Statistics.css";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/statistics?month=${month}`
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="statistics-container">
      <h3>
        <strong>Statistics - {month}</strong>{" "}
        <span className="month-label">(Selected month name from dropdown)</span>
      </h3>
      <div className="stats-box">
        <p>
          <strong>Total sale:</strong> {stats.totalSale}
        </p>
        <p>
          <strong>Total sold items:</strong> {stats.totalSoldItems}
        </p>
        <p>
          <strong>Total not sold items:</strong> {stats.totalNotSoldItems}
        </p>
      </div>
    </div>
  );
};

export default Statistics;
