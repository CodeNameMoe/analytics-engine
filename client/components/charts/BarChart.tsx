import React from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DataItem {
  name: string;
  total: number;
  [key: string]: any;
}

interface BarChartComponentProps {
  data: DataItem[];
  title: string;
  xAxisKey: string;
  barKey: string;
  isGrouped?: boolean;
}

const CustomXAxisTick: React.FC<any> = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" transform="rotate(-45)" fontSize={12}>
      {payload.value}
    </text>
  </g>
);

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, title, xAxisKey, barKey, isGrouped = false }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl mb-4">{title}</h2>
      <ResponsiveContainer width="80%" height={350}>
        <BarChart data={data}>
          <Legend />
          <Tooltip />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#888888" 
            tickLine={false} 
            axisLine={false} 
            interval={0} 
            height={100} // Increase height to accommodate the rotated labels
            tick={<CustomXAxisTick />}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          {isGrouped ? (
            Object.keys(data[0] || {}).filter(key => key !== xAxisKey).map((key, index) => (
              <Bar
                key={index}
                dataKey={key}
                stackId="a"
                fill={getColorForIndustry(key)}
                radius={[4, 4, 0, 0]}
              />
            ))
          ) : (
            <Bar
              dataKey={barKey}
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const getColorForIndustry = (industry: string): string => {
  const colorPalette: { [key: string]: string } = {
    "Networking": "#8884d8",
    "Retail": "#82ca9d",
    "Marketing": "#ffc658",
    "E-Commerce": "#ff8042",
    "DMS": "#0088fe",
    "Accounting": "#00c49f",
    "Business Analytics": "#ffbb28",
    "Consultancy": "#ff7300",
    "Publisher": "#a4de6c",
    "Social Equity": "#d0ed57",
    "Producer": "#ffc658",
    "Marketplace": "#8884d8",
    "Education": "#8dd1e1",
    "Drug Development": "#83a6ed"
  };
  return colorPalette[industry] || "#8884d8";
};

export default BarChartComponent;
