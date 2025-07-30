"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { Expense, ExpenseRecurrence, ExpenseStatus } from "@/lib/types";
import { formatExpenseRecurrence } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { EditExpenseDialog } from "./edit-expense-dialog";
import { DeleteExpenseAlert } from "./delete-expense-alert";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ExpenseStatusBadge } from "./expense-status-badge";
import { FormattedAmount } from "./formatted-amount";

export type ExpenseColumns = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const recurringExpenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div className="lg:w-52">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montante" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return <FormattedAmount amount={amount} />;
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

      return <ExpenseStatusBadge status={status} />;
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

export const oneTimeExpenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div className="lg:w-52">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montante" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return <FormattedAmount amount={amount} />;
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status: ExpenseStatus = row.getValue("status");

      return <ExpenseStatusBadge status={status} />;
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
