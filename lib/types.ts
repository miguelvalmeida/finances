import type { Database } from "./supabase/types";

export type Expense = Database["public"]["Tables"]["expenses"]["Row"];

export type ExpenseStatus = Database["public"]["Enums"]["expense-status"];

export type ExpenseRecurrence =
  Database["public"]["Enums"]["expense-recurrence"];

export type ExpenseType = "recurring" | "one-time";

export type Income = Database["public"]["Tables"]["income"]["Row"];

export type IncomeCategory = Database["public"]["Enums"]["income-categories"];

export type IncomeStatus = Database["public"]["Enums"]["income-status"];

export type IncomeType = Database["public"]["Enums"]["income-type"];

export type Balance =
  Database["public"]["Tables"]["assets_and_liabilities"]["Row"];

export type BalanceType = Database["public"]["Enums"]["balance-type"];
