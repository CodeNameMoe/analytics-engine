"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6478', '#32CD32', '#FF4500', '#9400D3', '#FFD700'];

interface DataItem {
  name: string;
  total: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, total } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Location: ${name}`}</p>
        <p>{`Total: ${total}`}</p>
      </div>
    );
  }
  return null;
};

const Page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_LOCAL;

  const handleReportChange = (value: string) => {
    setSelectedReport(value);

    let endpoint = "";
    
    switch (value) {
      case "by Type":
        endpoint = `${baseUrl}/events/by-type`;
        break;
      case "by Location":
        endpoint = `${baseUrl}/events/by-location`;
        break;
      case "by Price":
        endpoint = `${baseUrl}/events/by-price`;
        break;
      default:
        return;
    }

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData: DataItem[] = Object.entries(data).map(([name, total]) => ({ name, total: total as number }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const getTitle = () => {
    switch (selectedReport) {
      case "by Type":
        return "Events by Type";
      case "by Location":
        return "Events by Location";
      case "by Price":
        return "Events by Price";
      default:
        return "Events";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="">
        <h1 className="text-3xl">Events</h1>
      </div>
      <div className="pb-4">
        <Select onValueChange={handleReportChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a report" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Reports</SelectLabel>
              <SelectItem value="by Type">By Type</SelectItem>
              <SelectItem value="by Location">By Location</SelectItem>
              <SelectItem value="by Price">By Price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedReport && (
        selectedReport === "by Location" ? (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      )}
    </div>
  );
}

export default Page;
