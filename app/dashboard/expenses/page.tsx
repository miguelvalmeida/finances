import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { RecurringExpensesOverview } from "@/components/recurring-expenses-overview";
import { getExpenses } from "@/lib/data";
import { ExpenseTable } from "@/components/expense-table";
import {
  oneTimeExpenseColumns,
  recurringExpenseColumns,
} from "@/components/expense-columns";
import { OneTimeExpensesOverview } from "@/components/one-time-expenses-overview";
import { OneTimeExpensesLinearChart } from "@/components/one-time-expenses-linear-chart";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.expenses.name}`,
};

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  const recurringExpenses =
    expenses?.filter((expense) => expense.recurrence !== "one-time") ?? [];
  const oneTimeExpenses =
    expenses?.filter((expense) => expense.recurrence === "one-time") ?? [];

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-2">
          <span>🔁</span>
          Despesas recorrentes
        </h2>
        <p className="text-muted-foreground">
          Despesas que se repetem regularmente, como assinaturas, contas mensais
          ou anuais
        </p>
      </div>
      <RecurringExpensesOverview expenses={recurringExpenses} />
      <ExpenseTable
        expenseType="recurring"
        columns={recurringExpenseColumns}
        data={recurringExpenses}
      />
      <div className="grid gap-2">
        <h2 className="text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-2">
          <span>💸</span>
          Despesas pontuais
        </h2>
        <p className="text-muted-foreground">
          Despesas únicas que acontecem uma vez só, como gastos imprevistos ou
          pagamentos isolados
        </p>
      </div>
      <OneTimeExpensesOverview expenses={oneTimeExpenses} />
      <OneTimeExpensesLinearChart expenses={oneTimeExpenses} />
      <ExpenseTable
        expenseType="one-time"
        columns={oneTimeExpenseColumns}
        data={oneTimeExpenses}
      />
    </div>
  );
}
