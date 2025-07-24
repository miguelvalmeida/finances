"use client";

import { useTheme } from "next-themes";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Escuro</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
