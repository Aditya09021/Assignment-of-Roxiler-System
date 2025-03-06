import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./BarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/barchart?month=${month}`);
      const data = response.data;

      setChartData({
        labels: data.priceRanges,
        datasets: [
          {
            label: "Number of Items",
            data: data.itemCounts,
            backgroundColor: "rgba(72, 202, 228, 0.8)",
            borderColor: "rgba(72, 202, 228, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  return (
    <div className="bar-chart-container">
      <h3>
        <strong>Bar Chart Stats - {month}</strong>{" "}
        <span className="month-label">(Selected month name from dropdown)</span>
      </h3>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
};

export default BarChart;
