import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart,
 } from 'recharts';

const CustomLineChart = ({ data, type}) => {

    const getLineColor = (index) => {
        const palette = type === "income"
            ? ["#2e7d32", "#81c784"]
            : ["#d32f2f", "#ef9a9a"];

        return palette[index % palette.length];
    };

    const LineChartTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;

            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">
                        {type === "income" ? item?.source : item?.category}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount:{" "}
                        <span className="text-sm font-medium text-gray-900">
                            ${item?.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

  return (
    <div className="bg-white mt-6">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="expenseGradient" xl="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                </linearGradient>
            </defs>

            <CartesianGrid stroke="none" />
            <XAxis 
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--chart-text, #555)" }}
                stroke="none"
            />
            <YAxis 
                tick={{ fontSize: 12, fill: "var(--chart-text, #555)" }}
                stroke="none"
            />
            <Tooltip content={<LineChartTooltip />} />

            <Area 
              type="monotone"
              dataKey="amount"
              stroke="#d32f2f"
              fill="url(#expenseGradient)"
              strokeWidth={3}
              dot={{ r:3, fill: "#ab8df8"}}
            />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;