import React from 'react';
import { BarChart,
     Bar,
    XAxis,
    YAxis,
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Cell,
 } from 'recharts';

const CustomBarChart = ({ data, type}) => {

    const getBarColor = (index) => {
        const palette = type === "income"
            ? ["#2e7d32", "#81c784"]
            : ["#d32f2f", "#ef9a9a"];

        return palette[index % palette.length];
    };

    const BarChartTooltip = ({active, payload}) => {
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
            <BarChart data={data}>
                <CartesianGrid stroke="none" />

                <XAxis dataKey="date"
                tick={{ fontSize: 12, fill: "var(--chart-text, #555)" }}
                stroke="none"
                />
                <YAxis tick={{ fontSize: 12, fill: "var(--chart-text, #555)" }} stroke="none"/>
                <Tooltip content={<BarChartTooltip />} shared={false} />
                <Bar 
                    dataKey="amount" 
                    fill="#8884d8"
                    radius={[10, 10, 0, 0]}
                    activeDot={{ r: 8, fill: "yellow" }}
                    activeStyle={{ fill: "green" }}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(index)}
                            stroke="none"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;

