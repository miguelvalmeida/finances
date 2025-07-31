"use client";

import { Bar, BarChart, YAxis, XAxis, CartesianGrid } from "recharts";

import type { Balance, BalanceType } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function getChartData(balance: Balance[]) {
  return balance
    .map(({ name, value }) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);
}

const chartConfig = {
  value: {
    label: "Valor",
    color: "var(--primary)",
  },
  label: {
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface Props {
  type: BalanceType;
  balance: Balance[];
}

export function BalanceBarChart({ type, balance }: Props) {
  const chartData = getChartData(balance);

  const balanceType = type === "asset" ? "ativos" : "passivos";

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Distribuição dos {balanceType}</CardTitle>
        <CardDescription>
          Veja como os seus {balanceType} estão distribuídos entre as diferentes
          categorias
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {chartData.length === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center h-64 text-muted-foreground">
            <span className="text-4xl" aria-hidden="true">
              📊
            </span>
            <span className="text-center">
              Nenhum dado disponível para exibir o gráfico.
            </span>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 17,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis dataKey="name" type="category" />
              <XAxis dataKey="value" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="value"
                layout="vertical"
                fill="var(--color-value)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
