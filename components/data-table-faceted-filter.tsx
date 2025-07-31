import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";

interface Props<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: Props<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selecionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 gap-1" align="start">
        {options.map((option) => {
          const isChecked = selectedValues.has(option.value);
          return (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded hover:bg-accent"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => {
                  if (isChecked) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              />
              {option.icon && (
                <option.icon className="text-muted-foreground size-4" />
              )}
              <span className="text-sm">{option.label}</span>
              <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                {facets?.get(option.value) ?? 0}
              </span>
            </label>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
