"use client";

import Link from "next/link";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChartLine,
  CreditCard,
  Euro,
  HandCoins,
  Home,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/constants";

const items = [
  {
    name: routes.dashboard.name,
    url: routes.dashboard.url,
    icon: Home,
  },
  {
    name: routes.budget.name,
    url: routes.budget.url,
    icon: Euro,
  },
  {
    name: routes.expenses.name,
    url: routes.expenses.url,
    icon: CreditCard,
  },
  {
    name: routes.assets.name,
    url: routes.assets.url,
    icon: BanknoteArrowUp,
  },
  {
    name: routes.liabilities.name,
    url: routes.liabilities.url,
    icon: BanknoteArrowDown,
  },
  {
    name: routes.investments.name,
    url: routes.investments.url,
    icon: ChartLine,
  },
  {
    name: routes.netWorth.name,
    url: routes.netWorth.url,
    icon: HandCoins,
  },
];

export function NavItems() {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton isActive={pathname === item.url} asChild>
              <Link href={item.url}>
                <item.icon />
                {item.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
