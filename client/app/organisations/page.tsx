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
import BarChartComponent from "../../components/charts/BarChart";
import StackedBarChartComponent from "../../components/charts/StackedBarChartComponent";

interface DataItem {
  name: string;
  total: number;
}

interface IndustryLocationDataItem {
  industry: string;
  location: string;
  total: number;
}

const Page = () => {
  const [data, setData] = useState<DataItem[] | IndustryLocationDataItem[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_LOCAL;

  const handleReportChange = (value: string) => {
    setSelectedReport(value);

    let endpoint = "";
    
    switch (value) {
      case "by Industry":
        endpoint = `${baseUrl}/organizations/by-industry`;
        break;
      case "by Industry & Location":
        endpoint = `${baseUrl}/organizations/by-industry-location`;
        break;
      case "by Location":
        endpoint = `${baseUrl}/organizations/by-location`;
        break;
      case "By City":
        endpoint = `${baseUrl}/organizations/by-city`;
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
        if (value === "by Industry & Location") {
          const aggregatedData: { [key: string]: any } = {};
          for (const industry in data) {
            for (const location in data[industry]) {
              const key = location;
              if (!aggregatedData[key]) {
                aggregatedData[key] = { location };
              }
              aggregatedData[key][industry] = data[industry][location];
            }
          }
          const formattedData = Object.values(aggregatedData);
          setData(formattedData as IndustryLocationDataItem[]);
        } else {
          const formattedData: DataItem[] = Object.entries(data).map(([name, total]) => ({ name, total: total as number }));
          setData(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const getXAxisKey = () => {
    switch (selectedReport) {
      case "by Industry":
      case "by Location":
      case "By City":
        return "name";
      case "by Industry & Location":
        return "location";
      default:
        return "name";
    }
  };

  const getTitle = () => {
    switch (selectedReport) {
      case "by Industry":
        return "Organizations by Industry";
      case "by Industry & Location":
        return "Organizations by Industry & Location";
      case "by Location":
        return "Organizations by Location";
      case "By City":
        return "Organizations by City";
      default:
        return "Organizations";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="">
        <h1 className="text-3xl">Organizations</h1>
      </div>
      <div className="pb-4">
        <Select onValueChange={handleReportChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a report" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Reports</SelectLabel>
              <SelectItem value="by Industry">By Industry</SelectItem>
              <SelectItem value="by Industry & Location">By Industry & Location</SelectItem>
              <SelectItem value="by Location">By Location</SelectItem>
              <SelectItem value="By City">By City</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedReport && (
        selectedReport === "by Industry & Location" ? (
          <StackedBarChartComponent
            data={data as IndustryLocationDataItem[]}
            title={getTitle()}
            xAxisKey={getXAxisKey()}
          />
        ) : (
          <BarChartComponent
            data={data as DataItem[]}
            title={getTitle()}
            xAxisKey={getXAxisKey()}
            barKey="total"
          />
        )
      )}
    </div>
  );
}

export default Page;
