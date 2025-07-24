"use client";

import type { PropsWithChildren } from "react";

import { DropdownMenuContent } from "./ui/dropdown-menu";
import { useSidebar } from "./ui/sidebar";

export function NavUserDropdownMenuContent({ children }: PropsWithChildren) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      {children}
    </DropdownMenuContent>
  );
}
