import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "./ui/badge";

interface Props {
  percentage: number;
}

export function TrendBadge({ percentage }: Props) {
  return (
    <Badge variant="outline">
      {percentage >= 0 ? <TrendingUp /> : <TrendingDown />}
      {percentage.toFixed(1)}%
    </Badge>
  );
}
