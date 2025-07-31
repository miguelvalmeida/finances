import { createClient } from "./supabase/server";

export async function getExpenses() {
  const supabase = await createClient();

  const { data } = await supabase.from("expenses").select("*");

  return data;
}

export async function getIncome() {
  const supabase = await createClient();

  const { data } = await supabase.from("income").select("*");

  return data;
}
