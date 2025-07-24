import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.netWorth.name}`,
};

export default function NetWorthPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-7xl mb-2">🏗️</span>
      <span className="text-3xl font-semibold">WIP</span>
    </div>
  );
}
