export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const formatMoney = (num) => {
    if (num == null || isNaN(num)) return "";

    const numericValue = Number(num);

    const value = numericValue.toLocaleString(undefined, { 
            minimumFractionDigits: 2,
             maximumFractionDigits: 2,
             style: "currency",
             currency: "USD",
         });

    const [integerPart, fractionalPart] = value.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${formattedInteger}.${fractionalPart}`;
}

export const prepareExpenseBarChartData = (data = []) => {
    return [...data]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => {
            const date = item?.date ? new Date(item.date) : null;

        return {
            date: date && !isNaN(date)
                ? date.toLocaleString(undefined, dateOptions)
                : "Unknown",
            amount: Number(item?.amount || 0),
            category: item?.category || "Expense",
            
        };
        
    });
    
};

export const prepareIncomeBarChartData = (data = []) => {
    return [...data]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => {
            const date = item?.date ? new Date(item.date) : null;

        return {
            date: date && !isNaN(date)
                ? date.toLocaleString(undefined, dateOptions)
                : "Unknown",
            amount: Number(item?.amount || 0),
            source: item?.source || "Income",
            
        };
    });
};

export const prepareExpenseLineChartData = (data= []) => {
    return [...data]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => {
            const date = item?.date ? new Date(item.date) : null;

        return {
            date: date && !isNaN(date)
                ? date.toLocaleString(undefined, dateOptions)
                : "Unknown",
            amount: Number(item?.amount || 0),
            category: item?.category || "Expense",
            
        };
        
    });
};

export const dateOptions = {
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
};