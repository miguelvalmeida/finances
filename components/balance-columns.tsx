"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Balance } from "@/lib/types";

import { DataTableColumnHeader } from "./data-table-column-header";
import { FormattedAmount } from "./formatted-amount";
import { EditBalanceDialog } from "./edit-balance-dialog";
import { DeleteBalanceAlert } from "./delete-balance-alert";

export const columns: ColumnDef<Balance>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));

      return <FormattedAmount amount={amount} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const balance = row.original;

      return (
        <div className="text-right">
          <EditBalanceDialog balance={balance} />
          <DeleteBalanceAlert balance={balance} />
        </div>
      );
    },
  },
];
