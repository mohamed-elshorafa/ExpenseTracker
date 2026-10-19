import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { dateOptions } from '../../utils/helper';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Recent Expense Transactions</h5>

            <button className="card-btn" onClick={onDownload}>
                <LuDownload className="text-base" /> Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.category}
                    icon={item.icon}
                    date={new Date(item.date).toLocaleString(undefined, dateOptions)}
                    amount={item.amount}
                    type="expense"
                    onDelete={() => onDelete(item._id)}
                />
            ))}
        </div>
    </div>
  );
};

export default ExpenseList;