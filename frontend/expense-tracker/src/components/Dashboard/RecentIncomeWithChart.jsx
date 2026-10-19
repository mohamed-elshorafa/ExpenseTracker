import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const RecentIncomeWithChart = ({data, totalIncome }) => {

    const COLORS = ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9"];

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const result = data.map((item) => ({
            name: item.source || "Income",
            amount: item.amount,
        }));

        setChartData(result);
    };

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);

  return (
    <div className="card col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Income Last 60 Days</h5>
        </div>

        <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
        />
    </div>
  );
};

export default RecentIncomeWithChart;