"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { Expense, ExpenseRecurrence, ExpenseStatus } from "@/lib/types";
import { formatExpenseRecurrence, formatExpenseStatus } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { EditExpenseDialog } from "./edit-expense-dialog";
import { DeleteExpenseAlert } from "./delete-expense-alert";
import { DataTableColumnHeader } from "./data-table-column-header";

export type ExpenseColumns = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="lg:w-52">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montante" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("date");

      const formatted = format(date, "dd/MM/yyyy");

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: "recurrence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const recurrence: ExpenseRecurrence = row.getValue("recurrence");

      return (
        <Badge variant="outline">{formatExpenseRecurrence(recurrence)}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status: ExpenseStatus = row.getValue("status");

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
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div>
          <EditExpenseDialog expense={expense} />
          <DeleteExpenseAlert expense={expense} />
        </div>
      );
    },
  },
];
