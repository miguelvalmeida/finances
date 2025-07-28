import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { ExpensesOverview } from "@/components/expenses-overview";
import { ExpensesTabs } from "@/components/expenses-tabs";
import { getExpenses } from "@/lib/data";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.expenses.name}`,
};

// TODO: Add loading file

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <>
      <ExpensesOverview expenses={expenses} />
      <ExpensesTabs expenses={expenses} />
    </>
  );
}
