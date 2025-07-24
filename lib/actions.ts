"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Provider } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: "Email ou palavra-passe inválidos",
    };
  }

  redirect("/dashboard");
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
    return {
      error: "Ocorreu um erro, por favor tenta novamente",
    };
  }

  redirect("/dashboard");
}

export async function signout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function updateUser({ name }: { name: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });

  if (error) {
    return {
      error: "Ocorreu um erro, por favor tenta novamente",
    };
  }

  revalidatePath("/dashboard/account");
}

export async function resetPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.APP_BASE_URL}/update-password`,
  });

  if (error) {
    return {
      error: "Ocorreu um erro, por favor tenta novamente",
    };
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return {
      error:
        error.code === "same_password"
          ? "A nova password deve ser diferente da anterior"
          : "Ocorreu um erro, por favor tenta novamente",
    };
  }
}
