import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,

} from "@/components/ui/chart"
import { ChartEntry } from "@/lib/types";

interface SevenDayChartProps {
  data: ChartEntry[]
 }


const chartConfig = {
  time: {
    label: "Time",
    color: "#2563eb",
  },
} satisfies ChartConfig

const SevenDayChart: React.FC<SevenDayChartProps> = ({data}) => {



  return (

    <>
      <ChartContainer config={chartConfig} className="min-h-[100px] max-h-[150px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <Bar dataKey="time" fill="var(--color-time)" radius={4} />
          <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
        </BarChart>
      </ChartContainer>

    </>


  )
}

export default SevenDayChart