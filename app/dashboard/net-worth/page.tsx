import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { getBalance } from "@/lib/data";
import { NetWorthOverview } from "@/components/net-worth-overview";
import { BalanceTable } from "@/components/balance-table";
import { columns } from "@/components/balance-columns";
import { BalanceBarChart } from "@/components/balance-bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.netWorth.name}`,
};

export default async function NetWorthPage() {
  const balance = await getBalance();

  const liabilities = balance?.filter(({ type }) => type === "liability") ?? [];
  const assets = balance?.filter(({ type }) => type === "asset") ?? [];

  return (
    <div className="grid gap-4 md:gap-6">
      <NetWorthOverview balance={balance ?? []} />
      <div className="grid gap-4 lg:gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-1">
              <span>💰</span>
              Ativos
            </CardTitle>
            <CardDescription>
              Lista de todos os seus ativos atuais, incluindo contas,
              investimentos e outros bens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BalanceTable type="asset" columns={columns} data={assets} />
          </CardContent>
        </Card>
        <BalanceBarChart type="asset" balance={assets} />
      </div>
      <div className="grid gap-4 lg:gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-1">
              <span>📉</span>
              Passivos
            </CardTitle>
            <CardDescription>
              Lista de todos os seus passivos atuais, incluindo dívidas,
              financiamentos e outras obrigações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BalanceTable
              type="liability"
              columns={columns}
              data={liabilities}
            />
          </CardContent>
        </Card>
        <BalanceBarChart type="liability" balance={liabilities} />
      </div>
    </div>
  );
}
