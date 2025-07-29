"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { EXPENSE_RECURRENCES, EXPENSE_STATUSES } from "@/lib/constants";
import { formatExpenseRecurrence, formatExpenseStatus } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AddExpenseDialog } from "./add-expense-dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export const recurrences = EXPENSE_RECURRENCES.map((recurrence) => ({
  value: recurrence,
  label: formatExpenseRecurrence(recurrence),
}));

export const statuses = EXPENSE_STATUSES.map((status) => ({
  value: status,
  label: formatExpenseStatus(status),
}));

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2 flex-1 lg:flex-row lg:items-center">
        <Input
          placeholder="Filtrar despesas..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        <div className="flex flex-wrap gap-2">
          {table.getColumn("recurrence") && (
            <DataTableFacetedFilter
              column={table.getColumn("recurrence")}
              title="Tipo"
              options={recurrences}
            />
          )}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Estado"
              options={statuses}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnFilters()}
            >
              Limpar filtros
              <X />
            </Button>
          )}
        </div>
      </div>
      <AddExpenseDialog />
    </div>
  );
}
