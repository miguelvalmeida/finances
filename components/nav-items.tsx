"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  ChartLine,
  CreditCard,
  Euro,
  Home,
  Wallet,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
    name: routes.income.name,
    url: routes.income.url,
    icon: Euro,
  },
  {
    name: routes.expenses.name,
    url: routes.expenses.url,
    icon: CreditCard,
  },
  {
    name: routes.transactions.name,
    url: routes.transactions.url,
    icon: ArrowLeftRight,
  },
  {
    name: routes.netWorth.name,
    url: routes.netWorth.url,
    icon: Wallet,
  },
  {
    name: routes.investments.name,
    url: routes.investments.url,
    icon: ChartLine,
  },
];

export function NavItems() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton isActive={pathname === item.url} asChild>
              <Link href={item.url} onClick={() => setOpenMobile(false)}>
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
