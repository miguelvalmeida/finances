"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  EXPENSE_RECURRENCES,
  EXPENSE_STATUSES,
  ONE_TIME_EXPENSE_STATUSES,
  RECURRING_EXPENSE_OPTIONS,
  RECURRING_EXPENSE_STATUSES,
} from "@/lib/constants";
import { formatExpenseRecurrence, formatExpenseStatus } from "@/lib/utils";
import type { ExpenseType } from "@/lib/types";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const formSchema = z.object({
  name: z.string().min(1),
  amount: z
    .string()
    .min(1)
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }),
  date: z.date().optional(),
  status: z.enum(EXPENSE_STATUSES),
  recurrence: z.enum(EXPENSE_RECURRENCES),
});

export type ExpenseFormData = z.infer<typeof formSchema>;

interface Props {
  variant: "add" | "edit";
  type: ExpenseType;
  defaultValues: ExpenseFormData;
  onSubmit: (data: ExpenseFormData) => void;
}

export function ExpenseForm({ variant, type, defaultValues, onSubmit }: Props) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
        id={variant === "add" ? "add-expense" : "edit-expense"}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da despesa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montante</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recurrence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de despesa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={type === "one-time"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de despesa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {type === "recurring" ? (
                      RECURRING_EXPENSE_OPTIONS.map((recurrence) => (
                        <SelectItem key={recurrence} value={recurrence}>
                          {formatExpenseRecurrence(recurrence)}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="one-time">
                        {formatExpenseRecurrence("one-time")}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {type === "one-time" && (
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="font-normal">
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolhe uma data</span>
                          )}
                          <CalendarIcon
                            size={16}
                            className="ml-auto opacity-50"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Estado da despesa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(type === "recurring"
                      ? RECURRING_EXPENSE_STATUSES
                      : ONE_TIME_EXPENSE_STATUSES
                    ).map((status) => (
                      <SelectItem key={status} value={status}>
                        {formatExpenseStatus(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
