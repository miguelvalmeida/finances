import Link from "next/link";
import { ChevronsUpDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/lib/actions";
import { getNameInitials } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";
import { NavUserDropdownMenuContent } from "./nav-user-dropdown-menu-content";

export async function NavUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = {
    name: data.user?.user_metadata.full_name as string | undefined,
    email: data.user?.email,
    avatar: data.user?.user_metadata.avatar_url as string | undefined,
  };

  const nameInitials = getNameInitials(user.name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {nameInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <NavUserDropdownMenuContent>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {nameInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">
                  <User />
                  Conta
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal text-muted-foreground">
                Tema
              </DropdownMenuLabel>
              <ThemeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={signout}>
              <DropdownMenuItem asChild className="w-full">
                <button>
                  <LogOut />
                  Terminar sessão
                </button>
              </DropdownMenuItem>
            </form>
          </NavUserDropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
