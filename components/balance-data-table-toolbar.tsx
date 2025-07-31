"use client";

import { Table } from "@tanstack/react-table";

import type { BalanceType } from "@/lib/types";

import { Input } from "./ui/input";
import { AddBalanceDialog } from "./add-balance-dialog";

interface Props<TData> {
  type: BalanceType;
  table: Table<TData>;
}

export function BalanceDataTableToolbar<TData>({ type, table }: Props<TData>) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <Input
        placeholder={`Filtrar ${type === "asset" ? "ativos" : "passivos"}...`}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full lg:w-[250px]"
      />
      <AddBalanceDialog type={type} />
    </div>
  );
}
