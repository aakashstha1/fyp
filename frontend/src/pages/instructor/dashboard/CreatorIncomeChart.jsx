import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function CreatorIncomeChart() {
  const [timePeriod, setTimePeriod] = useState("daily");
  const [chartData, setChartData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const res = await axios.get(`${API_URL}/stats/income`, {
          withCredentials: true,
        });
        if (res.data && res.data.data) {
          setChartData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Gross Income
        </h3>

        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {["daily", "weekly", "monthly"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timePeriod === period
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData[timePeriod]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="period"
              tick={{ fontSize: 12, fill: "currentColor" }}
              axisLine={{ stroke: "currentColor" }}
              className="text-gray-700 dark:text-gray-300"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "currentColor" }}
              axisLine={{ stroke: "currentColor" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              className="text-gray-700 dark:text-gray-300"
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Income"]}
              labelStyle={{ color: "inherit" }}
              contentStyle={{
                backgroundColor: "var(--tw-prose-body, #fff)",
                color: "inherit",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
            />
            <CartesianGrid
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "#1d4ed8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CreatorIncomeChart;
