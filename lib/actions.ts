"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Provider } from "@supabase/supabase-js";

import { createClient } from "./supabase/server";
import { routes } from "./constants";
import { getAuthErrorMessage } from "./utils";
import type { ExpenseRecurrence, ExpenseStatus } from "./types";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: getAuthErrorMessage(error) };
  }

  redirect(routes.dashboard.url);
}

async function loginWith(provider: Provider) {
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.APP_BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function loginWithGoogle() {
  return await loginWith("google");
}

export async function signup({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: getAuthErrorMessage(error) };
  }

  redirect(routes.dashboard.url);
}

export async function signout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}

export async function updateUser({ name }: { name: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });

  if (error) {
    return { error: getAuthErrorMessage(error) };
  }
}

export async function resetPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.APP_BASE_URL}/update-password`,
  });

  if (error) {
    return { error: getAuthErrorMessage(error) };
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: getAuthErrorMessage(error) };
  }
}

type Expense = {
  name: string;
  amount: string;
  recurrence: ExpenseRecurrence;
  date: string;
  status: ExpenseStatus;
};

export async function addExpense(expense: Expense) {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase
    .from("expenses")
    .insert([
      {
        user_id: userId!,
        name: expense.name,
        amount: Number(expense.amount),
        date: expense.date,
        recurrence: expense.recurrence,
        status: expense.status,
      },
    ])
    .select();

  if (error) {
    return {
      error: "Ocorreu um erro ao adicionar a despesa. Tenta novamente.",
    };
  }

  revalidatePath(routes.expenses.url);
}

export async function editExpense(id: number, expense: Expense) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("expenses")
    .update({
      name: expense.name,
      amount: Number(expense.amount),
      date: expense.date,
      recurrence: expense.recurrence,
      status: expense.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: "Ocorreu um erro ao editar a despesa. Tenta novamente.",
    };
  }

  revalidatePath(routes.expenses.url);
}

export async function deleteExpense(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    return {
      error: "Ocorreu um erro ao apagar a despesa. Tenta novamente.",
    };
  }

  revalidatePath(routes.expenses.url);
}
