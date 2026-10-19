import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {

    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: ''
    });

    const handleChange = (key, value) => setExpense({...expense, [key]: value});

  return (
    <div>

        <EmojiPickerPopup 
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

      <Input
        value={expense.category}
        type="text"
        placeholder="Category"
        label="Rent, Food,  etc."
        onChange={(e) => handleChange('category', e.target.value)}
      />
      
      <Input
        value={expense.amount}
        type="number"
        placeholder=""
        label="Expense Amount"
        onChange={(e) => handleChange('amount', e.target.value)}
      />

      <Input
        value={expense.date}
        type="date"
        placeholder=""
        label="Date"
        onChange={(e) => handleChange('date', e.target.value)}
      />
      
      <div className="flex justify-end mt-6">
        <button 
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>

    </div>
  );
};

export default AddExpenseForm;