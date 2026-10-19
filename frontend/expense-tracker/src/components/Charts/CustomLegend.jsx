import React from 'react';

const CustomLegend = ({data, colors}) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
            {data.map((entry, index) => (
                <li
                    key={entry.name}
                    className="flex items-center gap-2 text-sm"
                >
                    <span
                        className="h-3 w-3 rounded-full"
                        style={{
                            backgroundColor:
                                colors[index % colors.length],
                        }}
                    />
                    <span className= "">{entry.name}</span>
                </li>
            ))}
        </ul>
  );
};

export default CustomLegend;