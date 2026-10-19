import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { formatMoney } from '../../utils/helper';

const COLORS = [ "#eb7c7c", "#81c784", "#875CF5",]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];


return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>

        <CustomPieChart 
          data={balanceData}
          label="Total Balance"
          totalAmount={formatMoney(totalBalance)}
          colors={COLORS}
          showTextAnchor
        />
    </div>
);
};

export default FinanceOverview;