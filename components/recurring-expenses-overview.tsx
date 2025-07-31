import type { Expense } from "@/lib/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { FormattedAmount } from "./formatted-amount";

function getExpenseStats(expenses: Expense[]) {
  const stats = {
    monthly: { total: 0, count: 0 },
    annual: { total: 0, count: 0 },
  };

  for (const expense of expenses) {
    if (expense.recurrence in stats && expense.status === "active") {
      stats[expense.recurrence as keyof typeof stats].count += 1;
      stats[expense.recurrence as keyof typeof stats].total += expense.amount;
    }
  }

  return stats;
}

const cards = [
  {
    key: "monthly",
    description: "Total despesas mensais",
  },
  {
    key: "annual",
    description: "Total despesas anuais",
  },
] as const;

interface Props {
  expenses: Expense[];
}

export function RecurringExpensesOverview({ expenses }: Props) {
  const expensesOverview = getExpenseStats(expenses);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ key, description }) => (
        <Card key={key}>
          <CardHeader>
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
              <FormattedAmount amount={expensesOverview[key].total} />
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            {`${expensesOverview[key].count} ${
              expensesOverview[key].count === 1
                ? "despesa ativa"
                : "despesas ativas"
            }`}
          </CardFooter>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardDescription>Total gasto anualmente</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
            <FormattedAmount
              amount={
                expensesOverview.annual.total +
                expensesOverview.monthly.total * 12
              }
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Estimativa do total gasto em despesas recorrentes por ano
        </CardFooter>
      </Card>
    </div>
  );
}
