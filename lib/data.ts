import { createClient } from "./supabase/server";

export async function getExpenses() {
  const supabase = await createClient();

  const { data: expenses, error } = await supabase.from("expenses").select("*");

  return expenses;
}
