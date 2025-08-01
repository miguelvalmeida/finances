import { DashboardBarChart } from "@/components/dashboard-bar-chart";
import { DashboardOverview } from "@/components/dashboard-overview";
import { getExpenses, getIncome, getBalance } from "@/lib/data";

export default async function DashboardPage() {
  const [expenses, income, balance] = await Promise.all([
    getExpenses(),
    getIncome(),
    getBalance(),
  ]);

  return (
    <div className="grid gap-4 md:gap-6">
      <DashboardOverview
        expenses={expenses ?? []}
        income={income ?? []}
        balance={balance ?? []}
      />
      <DashboardBarChart income={income ?? []} expenses={expenses ?? []} />
    </div>
  );
}
