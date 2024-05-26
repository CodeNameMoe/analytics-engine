import React from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IndustryLocationDataItem {
  industry: string;
  location: string;
  total: number;
  [key: string]: any;
}

interface StackedBarChartComponentProps {
  data: IndustryLocationDataItem[];
  title: string;
  xAxisKey: string;
}

const CustomXAxisTick: React.FC<any> = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" transform="rotate(-45)" fontSize={12}>
      {payload.value}
    </text>
  </g>
);

const StackedBarChartComponent: React.FC<StackedBarChartComponentProps> = ({ data, title, xAxisKey }) => {
  const industries = Array.from(new Set(data.flatMap(item => Object.keys(item).filter(key => key !== xAxisKey && key !== 'total'))));

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
          {industries.map(industry => (
            <Bar key={industry} dataKey={industry} stackId="a" fill={getColorForIndustry(industry)} />
          ))}
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

export default StackedBarChartComponent;
