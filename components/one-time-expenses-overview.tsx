import type { Expense } from "@/lib/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "./ui/card";
import { FormattedAmount } from "./formatted-amount";
import { TrendBadge } from "./trend-badge";
import { TrendIndicator } from "./trend-indicator";

function getExpenseStats(expenses: Expense[] | null) {
  let currentMonthTotal = 0;
  let currentMonthAmount = 0;
  let previousMonthAmount = 0;
  let hasEnoughDataMonthly = false;
  let currentYearAverageMonthly = 0;
  let currentYearTotal = 0;
  let previousYearTotal = 0;
  let hasEnoughDataYearly = false;

  if (expenses) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousYear = currentYear - 1;
    let hasCurrentMonthExpenses = false;
    let hasPreviousMonthExpenses = false;
    let hasCurrentYearExpenses = false;
    let hasPreviousYearExpenses = false;
    const currentYearMonths = new Set<string>();

    for (const expense of expenses) {
      if (expense.status === "paid" && expense.date) {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();
        const monthKey = `${expenseYear}-${expenseMonth}`;

        if (expenseYear === currentYear) {
          currentYearMonths.add(monthKey);
        }

        if (expenseMonth === currentMonth && expenseYear === currentYear) {
          currentMonthTotal += expense.amount;
          currentMonthAmount += expense.amount;
          hasCurrentMonthExpenses = true;
        } else if (
          expenseMonth === previousMonth &&
          expenseYear === previousMonthYear
        ) {
          previousMonthAmount += expense.amount;
          hasPreviousMonthExpenses = true;
        }
        if (expenseYear === currentYear) {
          currentYearTotal += expense.amount;
          hasCurrentYearExpenses = true;
        } else if (expenseYear === previousYear) {
          previousYearTotal += expense.amount;
          hasPreviousYearExpenses = true;
        }
      }
    }

    hasEnoughDataMonthly = hasCurrentMonthExpenses && hasPreviousMonthExpenses;
    hasEnoughDataYearly = hasCurrentYearExpenses && hasPreviousYearExpenses;
    currentYearAverageMonthly =
      currentYearMonths.size > 0
        ? currentYearTotal / currentYearMonths.size
        : 0;
  }

  const monthlyPercentageChange =
    hasEnoughDataMonthly && previousMonthAmount !== 0
      ? ((currentMonthAmount - previousMonthAmount) / previousMonthAmount) * 100
      : 0;
  const yearlyPercentageChange =
    hasEnoughDataYearly && previousYearTotal !== 0
      ? ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100
      : 0;

  return {
    currentMonthTotal,
    monthlyPercentageChange,
    hasEnoughDataMonthly,
    currentYearAverageMonthly,
    currentYearTotal,
    yearlyPercentageChange,
    hasEnoughDataYearly,
  };
}

interface Props {
  expenses: Expense[] | null;
}

export function OneTimeExpensesOverview({ expenses }: Props) {
  const expenseOverview = getExpenseStats(expenses);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>Total este mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount amount={expenseOverview.currentMonthTotal} />
          </CardTitle>
          {expenseOverview.hasEnoughDataMonthly && (
            <CardAction>
              <TrendBadge
                percentage={expenseOverview.monthlyPercentageChange}
              />
            </CardAction>
          )}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {expenseOverview.hasEnoughDataMonthly && (
            <TrendIndicator
              percentageChange={expenseOverview.monthlyPercentageChange}
              period="month"
            />
          )}
          <div className="text-muted-foreground">
            Total de despesas pontuais pagas em{" "}
            <span className="capitalize">
              {new Date().toLocaleString("pt-PT", { month: "long" })}
            </span>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>
            Média mensal em {new Date().getFullYear()}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount
              amount={expenseOverview.currentYearAverageMonthly}
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Média de despesas pontuais por mês em {new Date().getFullYear()}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total em {new Date().getFullYear()}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount amount={expenseOverview.currentYearTotal} />
          </CardTitle>
          {expenseOverview.hasEnoughDataYearly && (
            <CardAction>
              <TrendBadge percentage={expenseOverview.yearlyPercentageChange} />
            </CardAction>
          )}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {expenseOverview.hasEnoughDataYearly && (
            <TrendIndicator
              percentageChange={expenseOverview.yearlyPercentageChange}
              period="year"
            />
          )}
          <div className="text-muted-foreground">
            Total de despesas pontuais pagas em {new Date().getFullYear()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
