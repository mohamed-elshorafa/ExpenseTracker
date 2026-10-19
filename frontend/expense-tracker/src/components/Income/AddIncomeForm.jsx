import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {

    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: ''
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div>

        <EmojiPickerPopup 
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

      <Input
        value={income.source}
        type="text"
        placeholder="Source"
        label="Salary, Freelance, etc."
        onChange={(e) => handleChange('source', e.target.value)}
      />
      
      <Input
        value={income.amount}
        type="number"
        placeholder=""
        label="Income Amount"
        onChange={(e) => handleChange('amount', e.target.value)}
      />

      <Input
        value={income.date}
        type="date"
        placeholder=""
        label="Date"
        onChange={(e) => handleChange('date', e.target.value)}
      />
      
      <div className="flex justify-end mt-6">
        <button 
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>

    </div>
  );
};

export default AddIncomeForm;