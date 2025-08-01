"use client";

import { YAxis, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import type { Expense, Income } from "@/lib/types";

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

function getChartData(income: Income[], expenses: Expense[]) {
  const now = new Date();
  const months: { month: number; year: number; label: string }[] = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.getMonth();
    const year = d.getFullYear();
    const label =
      d.toLocaleString("default", { month: "short" }) +
      "/" +
      String(year).slice(-2);
    months.push({ month, year, label });
  }

  function sumIncome(month: number, year: number) {
    let total = 0;

    for (const inc of income) {
      if (inc.type === "recurring") {
        total += inc.amount;
      } else if (inc.type === "one-time" && inc.date) {
        const d = new Date(inc.date);
        if (
          d.getMonth() === month &&
          d.getFullYear() === year &&
          inc.status === "received"
        ) {
          total += inc.amount;
        }
      }
    }

    return total;
  }

  function sumExpenses(month: number, year: number) {
    let total = 0;

    for (const exp of expenses) {
      if (exp.recurrence === "monthly") {
        total += exp.amount;
      } else if (exp.recurrence === "one-time" && exp.date) {
        const d = new Date(exp.date);
        if (
          d.getMonth() === month &&
          d.getFullYear() === year &&
          (exp.status === "active" || exp.status === "paid")
        ) {
          total += exp.amount;
        }
      }
    }

    return total;
  }

  return months.map(({ month, year, label }) => ({
    label,
    income: sumIncome(month, year),
    expenses: sumExpenses(month, year),
  }));
}

interface Props {
  income: Income[];
  expenses: Expense[];
}

export function DashboardBarChart({ income, expenses }: Props) {
  const chartData = getChartData(income, expenses);

  const chartConfig = {
    income: {
      label: "Rendimentos",
      color: "var(--chart-3)",
    },
    expenses: {
      label: "Despesas",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimentos vs Despesas</CardTitle>
        <CardDescription>
          Comparação mensal de rendimentos e despesas nos últimos 12 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
