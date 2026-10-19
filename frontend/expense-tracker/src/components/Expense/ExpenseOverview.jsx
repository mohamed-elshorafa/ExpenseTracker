import React from 'react';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions = [], onAddExpense}) => {

    const chartData = prepareExpenseLineChartData(transactions);

  return (
    <div>
        <div className="card">
            <div className="flex justify-between items-center">
                <h5 className="text-lg">Expense Overview</h5>
                
                <button className="add-btn" onClick={onAddExpense}>
                    <LuPlus className="mr-1" />
                    Add Expense
                </button>
            </div>

            <h6 className="text-sm text-gray-500 mt-0.5 mb-5"> Analyze your expense trends and patterns over time. </h6>

           

            <div className="mt-10">
            <CustomLineChart data={chartData} type="expense" />
        </div>
        </div>

        
    </div>
  );
};

export default ExpenseOverview;