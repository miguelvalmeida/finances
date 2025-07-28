import type { Expense } from "@/lib/types";

import { AddExpenseDialog } from "./add-expense-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DataTable } from "./data-table";
import { expenseColumns } from "./expense-columns";

interface Props {
  expenses: Expense[] | null;
}

export function ExpensesTabs({ expenses }: Props) {
  console.log(expenses)
  const tabs = [
    {
      value: "monthly",
      name: "Mensal",
      data:
        expenses?.filter(({ recurrence }) => recurrence === "monthly") ?? [],
    },
    {
      value: "annual",
      name: "Anual",
      data: expenses?.filter(({ recurrence }) => recurrence === "annual") ?? [],
    },
    {
      value: "one-time",
      name: "Pontual",
      data:
        expenses?.filter(({ recurrence }) => recurrence === "one-time") ?? [],
    },
  ];

  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <div className="flex justify-between gap-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <AddExpenseDialog />
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <DataTable columns={expenseColumns} data={tab.data} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
