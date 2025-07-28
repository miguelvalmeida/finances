import type { Expense, ExpenseStatus } from "@/lib/types";
import { formatExpenseStatus } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { EditExpenseDialog } from "./edit-expense-dialog";
import { DeleteExpenseAlert } from "./delete-expense-alert";

const getStatusBadge = (status: ExpenseStatus) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    paid: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  } as const;

  return (
    <Badge className={colors[status]}>{formatExpenseStatus(status)}</Badge>
  );
};

interface Props {
  expenses: Expense[] | null | undefined;
}

export function ExpenseTable({ expenses }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Montante</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhuma despesa encontrada. Adiciona a tua primeira despesa para
                começares.
              </TableCell>
            </TableRow>
          ) : (
            expenses?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.amount.toFixed(2)}€</TableCell>
                <TableCell>
                  {new Date(expense.date).toLocaleDateString("pt-PT")}
                </TableCell>
                <TableCell>{getStatusBadge(expense.status)}</TableCell>
                <TableCell className="text-right">
                  <EditExpenseDialog expense={expense} />
                  <DeleteExpenseAlert expense={expense} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
