"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import {
  INCOME_CATEGORIES,
  INCOME_STATUSES,
  INCOME_TYPES,
} from "@/lib/constants";
import {
  formatIncomeCategory,
  formatIncomeStatus,
  formatIncomeType,
} from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { AddIncomeDialog } from "./add-income-dialog";

const categories = INCOME_CATEGORIES.map((category) => ({
  value: category,
  label: formatIncomeCategory(category),
}));

const types = INCOME_TYPES.map((type) => ({
  value: type,
  label: formatIncomeType(type),
}));

const statuses = INCOME_STATUSES.map((status) => ({
  value: status,
  label: formatIncomeStatus(status),
}));

interface Props<TData> {
  table: Table<TData>;
}

export function IncomeDataTableToolbar<TData>({ table }: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2 flex-1 lg:flex-row lg:items-center">
        <Input
          placeholder="Filtrar rendimentos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        <div className="flex flex-wrap gap-2">
          {table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Categoria"
              options={categories}
            />
          )}
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Tipo"
              options={types}
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
      <AddIncomeDialog />
    </div>
  );
}
