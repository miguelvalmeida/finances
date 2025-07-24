import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
