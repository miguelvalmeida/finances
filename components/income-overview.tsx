import type { Income } from "@/lib/types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { FormattedAmount } from "./formatted-amount";

function getIncomeStats(income: Income[]) {
  const recurring = { total: 0, count: 0 };
  const oneTime = { total: 0, count: 0 };
  const overall = { total: 0, count: 0 };

  for (const inc of income) {
    if (inc.type === "recurring") {
      recurring.count += 1;
      recurring.total += inc.amount;
    } else if (inc.type === "one-time" && inc.status === "received") {
      oneTime.count += 1;
      oneTime.total += inc.amount;
    }
    if (inc.status === "received") {
      overall.count += 1;
      overall.total += inc.amount;
    }
  }

  return { recurring, oneTime, overall };
}

const cards = [
  {
    key: "recurring",
    description: "Total rendimento recorrente",
  },
  {
    key: "oneTime",
    description: "Total rendimento pontual",
  },
  {
    key: "overall",
    description: "Rendimento total",
  },
] as const;

interface Props {
  income: Income[];
}

export function IncomeOverview({ income }: Props) {
  const incomeOverview = getIncomeStats(income);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ key, description }) => (
        <Card key={key}>
          <CardHeader>
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
              <FormattedAmount amount={incomeOverview[key].total} />
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            {`${incomeOverview[key].count} ${
              incomeOverview[key].count === 1
                ? "rendimento recebido"
                : "rendimentos recebidos"
            }`}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
