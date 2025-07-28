"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import type { Expense, ExpenseStatus } from "@/lib/types";
import { formatExpenseStatus } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { EditExpenseDialog } from "./edit-expense-dialog";
import { DeleteExpenseAlert } from "./delete-expense-alert";
import { Button } from "./ui/button";

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
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Montante
          <ArrowUpDown size={16} />
        </Button>
      );
    },
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
    header: "Data",
    cell: ({ row }) => {
      const date: string = row.getValue("date");

      const formatted = new Date(date).toLocaleDateString("pt-PT");

      return <>{formatted}</>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className="text-right">
          <EditExpenseDialog expense={expense} />
          <DeleteExpenseAlert expense={expense} />
        </div>
      );
    },
  },
];
