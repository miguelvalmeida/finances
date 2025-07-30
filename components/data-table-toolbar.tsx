"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import {
  ONE_TIME_EXPENSE_STATUSES,
  RECURRING_EXPENSE_OPTIONS,
  RECURRING_EXPENSE_STATUSES,
} from "@/lib/constants";
import { formatExpenseRecurrence, formatExpenseStatus } from "@/lib/utils";
import type { ExpenseType } from "@/lib/types";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AddExpenseDialog } from "./add-expense-dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

const recurrences = RECURRING_EXPENSE_OPTIONS.map((recurrence) => ({
  value: recurrence,
  label: formatExpenseRecurrence(recurrence),
}));

function getStatuses(expenseType: ExpenseType) {
  return (
    expenseType === "recurring"
      ? RECURRING_EXPENSE_STATUSES
      : ONE_TIME_EXPENSE_STATUSES
  ).map((status) => ({
    value: status,
    label: formatExpenseStatus(status),
  }));
}

interface DataTableToolbarProps<TData> {
  expenseType: ExpenseType;
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  expenseType,
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
          {expenseType === "recurring" && table.getColumn("recurrence") && (
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
              options={getStatuses(expenseType)}
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
      <AddExpenseDialog type={expenseType} />
    </div>
  );
}
