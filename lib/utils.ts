import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AuthError } from "@supabase/supabase-js";

import type { ExpenseRecurrence, ExpenseStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameInitials(name?: string) {
  const nameArray = name?.split(" ");
  const firstInitial = nameArray?.[0].charAt(0);
  const lastInitial = nameArray?.[nameArray.length - 1].charAt(0);

  if (nameArray?.length === 1) {
    return firstInitial;
  }

  return [firstInitial, lastInitial].join("");
}

export function getAuthErrorMessage(error: AuthError) {
  switch (error.code) {
    case "user_already_exists":
      return "Já existe uma conta com este email";
    case "same_password":
      return "A nova palavra-passe deve ser diferente da anterior";
    case "invalid_credentials":
      return "Email ou palavra-passe inválidos";
    default:
      return "Ocorreu um erro, por favor tenta novamente";
  }
}

export function formatExpenseRecurrence(recurrence: ExpenseRecurrence) {
  switch (recurrence) {
    case "monthly":
      return "Mensal";
    case "annual":
      return "Anual";
    case "one-time":
      return "Pontual";
    default:
      return recurrence;
  }
}

export function formatExpenseStatus(status: ExpenseStatus) {
  switch (status) {
    case "active":
      return "Ativo";
    case "inactive":
      return "Inativo";
    case "cancelled":
      return "Cancelado";
    case "pending":
      return "Pendente";
    case "paid":
      return "Pago";
    default:
      return status;
  }
}
