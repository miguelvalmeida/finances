import type { Balance } from "@/lib/types";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { FormattedAmount } from "./formatted-amount";

function getNetWorthStats(balance: Balance[]) {
  let totalAssets = 0;
  let totalLiabilities = 0;

  for (const item of balance) {
    if (item.type === "asset") {
      totalAssets += item.value;
    } else if (item.type === "liability") {
      totalLiabilities += item.value;
    }
  }

  const netWorth = totalAssets - totalLiabilities;

  return { totalAssets, totalLiabilities, netWorth };
}

const cards = [
  {
    key: "totalAssets",
    description: "Total de ativos",
    label: "Ativos",
  },
  {
    key: "totalLiabilities",
    description: "Total de passivos",
    label: "Passivos",
  },
  {
    key: "netWorth",
    description: "Património líquido",
    label: "Património",
  },
] as const;

interface Props {
  balance: Balance[];
}

export function NetWorthOverview({ balance }: Props) {
  const { totalAssets, totalLiabilities, netWorth } = getNetWorthStats(balance);

  const values = {
    totalAssets,
    totalLiabilities,
    netWorth,
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ key, description }) => (
        <Card key={key}>
          <CardHeader>
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
              <FormattedAmount amount={values[key]} />
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
