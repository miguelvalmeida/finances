import type { Expense } from "@/lib/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

function getExpenseStats(expenses: Expense[] | null) {
  const stats = {
    monthly: { total: 0, count: 0 },
    annual: { total: 0, count: 0 },
    "one-time": { total: 0, count: 0 },
  };

  if (!expenses) return stats;

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
  {
    key: "one-time",
    description: "Total despesas pontuais",
  },
] as const;

interface Props {
  expenses: Expense[] | null;
}

export function ExpensesOverview({ expenses }: Props) {
  const expensesOverview = getExpenseStats(expenses);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:grid-cols-3">
      {cards.map(({ key, description }) => (
        <Card key={key}>
          <CardHeader>
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
              {new Intl.NumberFormat("pt-PT", {
                style: "currency",
                currency: "EUR",
              }).format(expensesOverview[key].total)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            {expensesOverview[key].count} despesas ativas
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
