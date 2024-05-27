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

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface DataItem {
  name: string;
  total: number;
}

const Page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_LOCAL;

  const handleReportChange = (value: string) => {
    setSelectedReport(value);

    if (value === "by publication date") {
      const endpoint = `${baseUrl}/content/by-publication-date`;

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
    }
  };


  const getXAxisKey = () => {
    return "name";
  };

  const getTitle = () => {
    return "Content by Publication Date";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="">
        <h1 className="text-3xl">Content</h1>
      </div>
      <div className="pb-4">
        <Select onValueChange={handleReportChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a report" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Reports</SelectLabel>
              <SelectItem value="by publication date">By Publication Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedReport && (
        <ResponsiveContainer width="80%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getXAxisKey()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Page;
