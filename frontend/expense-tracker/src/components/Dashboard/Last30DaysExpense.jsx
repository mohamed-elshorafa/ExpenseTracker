import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseBarChartData } from '../../utils/helper';

const Last30DaysExpense = ({data}) => {

    // const [chartData, setChartData] = useState([]);

    // useEffect(() => {
    //     const result = prepareExpenseBarChartData(data);
    //     setChartData(result);

    //     return () => {};
    // }, [data]);

    const chartData = prepareExpenseBarChartData(data);

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expenses Last 30 Days</h5>
        </div>
        <div className="mt-10">
        <CustomBarChart data={chartData} type="expense" />
        </div>
    </div>
  );
};

export default Last30DaysExpense;