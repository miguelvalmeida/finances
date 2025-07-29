import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { ExpensesOverview } from "@/components/expenses-overview";
import { getExpenses } from "@/lib/data";
import { DataTable } from "@/components/data-table";
import { expenseColumns } from "@/components/expense-columns";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.expenses.name}`,
};

// TODO: Add loading file

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <div className="grid gap-4 md:gap-6">
      <ExpensesOverview expenses={expenses} />
      <DataTable columns={expenseColumns} data={expenses ?? []} />
    </div>
  );
}
