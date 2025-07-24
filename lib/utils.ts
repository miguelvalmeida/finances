import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AuthError } from "@supabase/supabase-js";

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
