"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import type { Income } from "@/lib/types";
import { CHART_MONTH_NAMES } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function getChartData(income: Income[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const last12Months = [];

  for (let i = 12; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const month = date.getMonth();
    const year = date.getFullYear();
    last12Months.push({ month, year, total: 0 });
  }

  for (const inc of income) {
    if (inc.type === "recurring" && inc.status === "received") {
      // Add recurring income to every month in the range
      for (const monthData of last12Months) {
        monthData.total += inc.amount;
      }
    } else if (
      inc.type === "one-time" &&
      inc.status === "received" &&
      inc.date
    ) {
      // Only add one-time income to the month it was received
      const incomeDate = new Date(inc.date);
      const incomeMonth = incomeDate.getMonth();
      const incomeYear = incomeDate.getFullYear();

      for (const monthData of last12Months) {
        if (monthData.month === incomeMonth && monthData.year === incomeYear) {
          monthData.total += inc.amount;
        }
      }
    }
  }

  return last12Months.map((data) => ({
    month: CHART_MONTH_NAMES[data.month],
    total: data.total,
  }));
}

interface Props {
  income: Income[];
}

export function IncomeLineChart({ income }: Props) {
  const chartData = getChartData(income);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do rendimento ao longo do tempo</CardTitle>
        <CardDescription>
          Total de rendimento recebido por mês nos últimos 12 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value / 1000}k`}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="total"
              type="natural"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
