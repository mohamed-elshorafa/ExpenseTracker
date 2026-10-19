import React from 'react';
import {
    PieChart,
    Pie,
    Sector,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => 
    
    {const renderCustomShape = (props) => (
    <Sector
        {...props}
        fill={colors[props.index % colors.length]}
    />
);

  return <ResponsiveContainer width="100%" height={380}>
    <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          innerRadius="60%"
          labelLine={false}
          shape={renderCustomShape}
        >
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
        <Legend content={<CustomLegend data={data} colors={colors} />} />

        {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="var(--chart-text, #666)"
                fontSize="14px"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="var(--chart-text, #333)"
                fontSize="24px"
                fontWeight="semi-bold"
              >
                {totalAmount}
              </text>
            </>
        )}
    </PieChart>
  </ResponsiveContainer>
};

export default CustomPieChart;