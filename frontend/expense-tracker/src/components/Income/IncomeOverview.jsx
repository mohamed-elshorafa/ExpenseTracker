import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions = [], onAddIncome}) => {
    // const [chartData, setChartData] = useState([]);
    
    // useEffect(() => {
    //     const result = prepareIncomeBarChartData(transactions);
    //     setChartData(result);
    // }, [transactions]);

    const chartData = prepareIncomeBarChartData(transactions);

  return (
    <div>
        <div className="card">
            <div className="flex justify-between items-center">
                <h5 className="text-lg">Income Overview</h5>
                
                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="mr-1" />
                    Add Income
                </button>
            </div>

            <h6 className="text-sm text-gray-500 mt-0.5 mb-5"> Analyze your income trends and patterns over time. </h6>

           

            <div className="mt-10">
            <CustomBarChart data={chartData} type="income" />
        </div>
        </div>

        
    </div>
  );
};

export default IncomeOverview;