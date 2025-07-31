"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(1)
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }),
});

export type BalanceFormData = z.infer<typeof formSchema>;

interface Props {
  variant: "add" | "edit";
  defaultValues: BalanceFormData;
  onSubmit: (data: BalanceFormData) => void;
}

export function BalanceForm({ variant, defaultValues, onSubmit }: Props) {
  const form = useForm<BalanceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
        id={variant === "add" ? "add-balance" : "edit-balance"}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
