import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,

} from "@/components/ui/chart"

const chartData = [
  { day: "Sunday", time: 186 },
  { day: "Monday", time: 305 },
  { day: "Tuesday", time: 237 },
  { day: "Wednesday", time: 73 },
  { day: "Thursday", time: 209 },
  { day: "Friday", time: 214 },
  { day: "Saturday", time: 150 },
]

const chartConfig = {
  time: {
    label: "Time",
    color: "#2563eb",
  },
} satisfies ChartConfig

const SevenDayChart: React.FC = () => {
  return (

    <>
      <ChartContainer config={chartConfig} className="min-h-[100px] max-h-[150px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <Bar dataKey="time" fill="var(--color-time)" radius={4} />

        </BarChart>
      </ChartContainer>

    </>


  )
}

export default SevenDayChart