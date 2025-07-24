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

  return <span className="font-bold">{getTitleFromPath(pathname)}</span>;
}
