"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Repeat, Calendar } from "lucide-react";

import type {
  Income,
  IncomeCategory,
  IncomeStatus,
  IncomeType,
} from "@/lib/types";
import {
  formatIncomeCategory,
  formatIncomeStatus,
  formatIncomeType,
} from "@/lib/utils";

import { Badge } from "./ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { FormattedAmount } from "./formatted-amount";
import { DeleteIncomeAlert } from "./delete-income-alert";
import { EditIncomeDialog } from "./edit-income-dialog";

export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div className="lg:w-52">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const category: IncomeCategory = row.getValue("category");

      return <Badge variant="outline">{formatIncomeCategory(category)}</Badge>;
    },
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const type: IncomeType = row.getValue("type");

      return (
        <Badge variant="outline" className="flex items-center gap-1">
          {type === "recurring" ? (
            <Repeat size={14} className="text-muted-foreground" />
          ) : (
            <Calendar size={14} className="text-muted-foreground" />
          )}
          {formatIncomeType(type)}
        </Badge>
      );
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
      const status: IncomeStatus = row.getValue("status");

      const colors = {
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        received: "bg-green-100 text-green-800 hover:bg-green-100",
      } as const;

      return (
        <Badge className={colors[status]}>{formatIncomeStatus(status)}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const income = row.original;

      return (
        <div>
          <EditIncomeDialog income={income} />
          <DeleteIncomeAlert incomeId={income.id} />
        </div>
      );
    },
  },
];
