"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
  category: z.enum(INCOME_CATEGORIES),
  type: z.enum(INCOME_TYPES),
  date: z.date(),
  status: z.enum(INCOME_STATUSES),
});

export type IncomeFormData = z.infer<typeof formSchema>;

interface Props {
  variant: "add" | "edit";
  defaultValues: IncomeFormData;
  onSubmit: (data: IncomeFormData) => void;
}

export function IncomeForm({ variant, defaultValues, onSubmit }: Props) {
  const form = useForm<IncomeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
        id={variant === "add" ? "add-income" : "edit-income"}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do rendimento</FormLabel>
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleciona categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INCOME_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {formatIncomeCategory(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipo de rendimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INCOME_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatIncomeType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
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
                      <CalendarIcon size={16} className="ml-auto opacity-50" />
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Estado do rendimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INCOME_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {formatIncomeStatus(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
