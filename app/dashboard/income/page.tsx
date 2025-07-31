import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { getIncome } from "@/lib/data";
import { IncomeOverview } from "@/components/income-overview";
import { IncomeLineChart } from "@/components/income-line-chart";
import { IncomeTable } from "@/components/income-table";
import { columns } from "@/components/income-columns";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.income.name}`,
};

// TODO: Add loading file

export default async function IncomePage() {
  const income = (await getIncome()) ?? [];

  return (
    <div className="grid gap-4 md:gap-6">
      <IncomeOverview income={income} />
      <IncomeLineChart income={income} />
      <IncomeTable columns={columns} data={income} />
    </div>
  );
}
