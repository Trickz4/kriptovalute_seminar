import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data1 = [
  { time: "00:00", amount: 0 },
  { time: "00:30", amount: 300 },
  { time: "00:60", amount: 600 },
  // createData("03:00", 300),
  // createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function MarketPriceChart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState("");
  let parsedData;
  useEffect(() => {
    // Update component upon mounting
    console.log("status updated!");

    fetch("/marketPriceChartData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          console.log(data.values);

          parsedData = data.values.map((value) => ({
            x: new Date(value.x * 1000).toLocaleDateString("en-GB"),
            y: value.y,
          }));
          console.log(parsedData);
          setChartData(parsedData);
        } else alert("Error in fetching chart data!");
      });
  }, []); // empty array to stop infinitive loop -> it is a dependency

  const formatYaxis = (tickItem) => {
    return `${tickItem.toLocaleString()}$`;
  };

  return (
    <React.Fragment>
      <Title>Market price per day (Last 365 days)</Title>
      {chartData && (
        <ResponsiveContainer>
          <LineChart
            // width={600}
            // height={500}
            data={chartData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 20,
            }}
          >
            <XAxis
              dataKey="x"
              stroke={theme.palette.text.secondary}
              minTickGap={30}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tickFormatter={formatYaxis}
              dy={0}
            >
              <Label
                offset={15}
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                }}
              >
                Market Price ($)
              </Label>
            </YAxis>
            <Line
              animationEasing="ease"
              animationDuration={3000}
              type="monotone"
              dataKey="y"
              stroke={theme.palette.primary.main}
              dot={false}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </React.Fragment>
  );
}
