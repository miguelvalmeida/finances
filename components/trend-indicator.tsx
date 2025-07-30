import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  percentageChange: number;
  period: "month" | "year";
}

export function TrendIndicator({ percentageChange, period }: Props) {
  const isPositive = percentageChange >= 0;
  const label = isPositive ? "Aumentou" : "Diminuiu";
  const periodLabel =
    period === "month" ? "mês" : period === "year" ? "ano" : "";

  return (
    <div className="line-clamp-1 flex items-center gap-2 font-medium">
      <span>
        {label} este {periodLabel}
      </span>
      {isPositive ? (
        <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
      ) : (
        <TrendingDown className="size-4 text-red-600 dark:text-red-400" />
      )}
    </div>
  );
}
