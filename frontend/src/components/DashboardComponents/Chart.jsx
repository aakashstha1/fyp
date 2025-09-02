import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample data for different time periods
const chartData = {
  daily: [
    { period: "Mon", income: 1200 },
    { period: "Tue", income: 1800 },
    { period: "Wed", income: 1500 },
    { period: "Thu", income: 2200 },
    { period: "Fri", income: 2800 },
    { period: "Sat", income: 2100 },
    { period: "Sun", income: 1900 },
  ],
  weekly: [
    { period: "Week 1", income: 12000 },
    { period: "Week 2", income: 15000 },
    { period: "Week 3", income: 13500 },
    { period: "Week 4", income: 18000 },
    { period: "Week 5", income: 16500 },
  ],
  monthly: [
    { period: "Jan", income: 52000 },
    { period: "Feb", income: 67000 },
    { period: "Mar", income: 63500 },
    { period: "Apr", income: 78000 },
    { period: "May", income: 85000 },
    { period: "Jun", income: 79000 },
  ],
};

function Chart() {
  const [timePeriod, setTimePeriod] = useState("monthly");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Gross Income</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {["daily", "weekly", "monthly"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timePeriod === period
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData[timePeriod]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="period"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Income"]}
              labelStyle={{ color: "#374151" }}
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
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

export default Chart;
