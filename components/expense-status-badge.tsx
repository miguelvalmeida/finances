import type { ExpenseStatus } from "@/lib/types";
import { formatExpenseStatus } from "@/lib/utils";

import { Badge } from "./ui/badge";

interface Props {
  status: ExpenseStatus;
}

export function ExpenseStatusBadge({ status }: Props) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    paid: "bg-green-100 text-green-800 hover:bg-green-100",
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  } as const;

  return (
    <Badge className={colors[status]}>{formatExpenseStatus(status)}</Badge>
  );
}
