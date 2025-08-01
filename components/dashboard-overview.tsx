import Link from "next/link";

import type { Expense, Income, Balance } from "@/lib/types";
import { routes } from "@/lib/constants";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "./ui/card";
import { FormattedAmount } from "./formatted-amount";

function getCurrentMonthYear() {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
}

function getIncomeThisMonth(income: Income[]) {
  const { month, year } = getCurrentMonthYear();
  let total = 0;
  let count = 0;

  for (const inc of income) {
    if (inc.status !== "received") continue;
    if (inc.type === "recurring") {
      total += inc.amount;
      count += 1;
    } else if (inc.type === "one-time" && inc.date) {
      const incDate = new Date(inc.date);
      if (incDate.getMonth() === month && incDate.getFullYear() === year) {
        total += inc.amount;
        count += 1;
      }
    }
  }
  return { total, count };
}

function getExpensesThisMonth(expenses: Expense[]) {
  const { month, year } = getCurrentMonthYear();
  let total = 0;
  let count = 0;

  for (const exp of expenses) {
    if (exp.status !== "active" && exp.status !== "paid") continue;
    if (exp.recurrence === "monthly") {
      total += exp.amount;
      count += 1;
    } else if (exp.recurrence === "one-time" && exp.date) {
      const expDate = new Date(exp.date);
      if (expDate.getMonth() === month && expDate.getFullYear() === year) {
        total += exp.amount;
        count += 1;
      }
    }
  }

  return { total, count };
}

function getNetWorth(balance: Balance[]) {
  let assets = 0;
  let liabilities = 0;

  for (const item of balance) {
    if (item.type === "asset") {
      assets += item.value;
    } else if (item.type === "liability") {
      liabilities += item.value;
    }
  }

  return assets - liabilities;
}

interface Props {
  expenses: Expense[];
  income: Income[];
  balance: Balance[];
}

export function DashboardOverview({ expenses, income, balance }: Props) {
  const netWorth = getNetWorth(balance);
  const incomeMonth = getIncomeThisMonth(income);
  const expensesMonth = getExpensesThisMonth(expenses);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>Património</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount amount={netWorth} />
          </CardTitle>
          <CardAction className="text-xl">🏦</CardAction>
        </CardHeader>
        <CardFooter className="grid gap-1">
          <span className="text-sm text-muted-foreground">
            Valor total dos teus ativos menos passivos
          </span>
          <Link
            href={routes.netWorth.url}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver património
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Rendimento este mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount amount={incomeMonth.total} />
          </CardTitle>
          <CardAction className="text-xl">💸</CardAction>
        </CardHeader>
        <CardFooter className="grid gap-1">
          <span className="text-sm text-muted-foreground">
            {incomeMonth.count === 1
              ? "1 rendimento recebido"
              : `${incomeMonth.count} rendimentos recebidos`}
          </span>
          <Link
            href={routes.income.url}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver rendimentos
          </Link>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Despesas este mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount amount={expensesMonth.total} />
          </CardTitle>
          <CardAction className="text-xl">📉</CardAction>
        </CardHeader>
        <CardFooter className="grid gap-1">
          <span className="text-sm text-muted-foreground">
            {expensesMonth.count === 1
              ? "1 despesa contabilizada"
              : `${expensesMonth.count} despesas contabilizadas`}
          </span>
          <Link
            href={routes.expenses.url}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver despesas
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
