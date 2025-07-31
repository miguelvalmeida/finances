"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Provider } from "@supabase/supabase-js";

import { createClient } from "./supabase/server";
import { routes } from "./constants";
import { getAuthErrorMessage } from "./utils";
import type {
  BalanceType,
  ExpenseRecurrence,
  ExpenseStatus,
  IncomeCategory,
  IncomeStatus,
  IncomeType,
} from "./types";

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
      // TODO: need to change this to get url dynamically
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
    // TODO: need to change this to get url dynamically
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

export async function deleteUser() {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase.functions.invoke("delete-user", {
    method: "POST",
    body: { userId },
  });

  if (error) {
    return {
      error: "Ocorreu um erro ao eliminar a tua conta. Tenta novamente.",
    };
  }

  await signout();
}

type ExpenseFormData = {
  name: string;
  amount: string;
  recurrence: ExpenseRecurrence;
  date?: Date;
  status: ExpenseStatus;
};

export async function addExpense(expense: ExpenseFormData) {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase
    .from("expenses")
    .insert([
      {
        user_id: userId!,
        name: expense.name,
        amount: Number(expense.amount),
        date: expense.date?.toISOString(),
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

export async function editExpense(id: number, expense: ExpenseFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("expenses")
    .update({
      name: expense.name,
      amount: Number(expense.amount),
      date: expense.date?.toISOString(),
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
      error: "Ocorreu um erro ao apagar esta despesa. Tenta novamente.",
    };
  }

  revalidatePath(routes.expenses.url);
}

type IncomeFormData = {
  name: string;
  amount: string;
  category: IncomeCategory;
  type: IncomeType;
  date: Date;
  status: IncomeStatus;
};

export async function addIncome(income: IncomeFormData) {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase
    .from("income")
    .insert([
      {
        user_id: userId!,
        name: income.name,
        amount: Number(income.amount),
        category: income.category,
        type: income.type,
        date: income.date.toISOString(),
        status: income.status,
      },
    ])
    .select();

  if (error) {
    return {
      error: "Ocorreu um erro ao adicionar o rendimento. Tenta novamente.",
    };
  }

  revalidatePath(routes.income.url);
}

export async function editIncome(id: number, income: IncomeFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("income")
    .update({
      name: income.name,
      amount: Number(income.amount),
      category: income.category,
      type: income.type,
      date: income.date.toISOString(),
      status: income.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: "Ocorreu um erro ao editar o rendimento. Tenta novamente.",
    };
  }

  revalidatePath(routes.income.url);
}

export async function deleteIncome(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("income").delete().eq("id", id);

  if (error) {
    return {
      error: "Ocorreu um erro ao apagar o rendimento. Tenta novamente.",
    };
  }

  revalidatePath(routes.income.url);
}

type BalanceFormData = {
  name: string;
  type: BalanceType;
  value: string;
};

export async function addBalance(balance: BalanceFormData) {
  const supabase = await createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { error } = await supabase
    .from("assets_and_liabilities")
    .insert([
      {
        user_id: userId!,
        name: balance.name,
        value: Number(balance.value),
        type: balance.type,
      },
    ])
    .select();

  if (error) {
    return {
      error: `Ocorreu um erro ao adicionar o ${
        balance.type === "asset" ? "ativo" : "passivo"
      }. Tenta novamente.`,
    };
  }

  revalidatePath(routes.netWorth.url);
}

export async function editBalance(id: number, balance: BalanceFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("assets_and_liabilities")
    .update({
      name: balance.name,
      value: Number(balance.value),
      type: balance.type,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: `Ocorreu um erro ao editar o ${
        balance.type === "asset" ? "ativo" : "passivo"
      }. Tenta novamente.`,
    };
  }

  revalidatePath(routes.netWorth.url);
}

export async function deleteBalance(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("assets_and_liabilities")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      error: "Ocorreu um erro ao apagar o ativo/passivo. Tenta novamente.",
    };
  }

  revalidatePath(routes.netWorth.url);
}
