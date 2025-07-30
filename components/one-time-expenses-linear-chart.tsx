"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import type { Expense } from "@/lib/types";

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

function getChartData(expenses: Expense[]) {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

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

  for (const expense of expenses) {
    if (expense.status === "paid" && expense.date) {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();

      for (const monthData of last12Months) {
        if (
          monthData.month === expenseMonth &&
          monthData.year === expenseYear
        ) {
          monthData.total += expense.amount;
        }
      }
    }
  }

  return last12Months.map((data) => ({
    month: monthNames[data.month],
    total: data.total,
  }));
}

interface Props {
  expenses: Expense[];
}

export function OneTimeExpensesLinearChart({ expenses }: Props) {
  const chartData = getChartData(expenses);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas pontuais</CardTitle>
        <CardDescription>
          Evolução das despesas pontuais no último ano
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
              tickFormatter={(value) => value}
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
