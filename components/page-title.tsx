"use client";

import { usePathname } from "next/navigation";

import { routes } from "@/lib/constants";

function getTitleFromPath(path: string) {
  for (const route of Object.values(routes)) {
    if (path === route.url) {
      return route.name;
    }
  }
  return "";
}

export function PageTitle() {
  const pathname = usePathname();

  return (
    <h1 className="text-base font-medium">{getTitleFromPath(pathname)}</h1>
  );
}
