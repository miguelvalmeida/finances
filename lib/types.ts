import type { Database } from "./supabase/types";

export type ExpenseStatus = Database["public"]["Enums"]["expense-status"];

export type ExpenseRecurrence =
  Database["public"]["Enums"]["expense-recurrence"];

export type Expense = Database["public"]["Tables"]["expenses"]["Row"];

export type ExpenseType = "recurring" | "one-time";
