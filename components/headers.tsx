import Link from "next/link";

import { signout } from "@/lib/actions";

import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="h-16 border-b bg-white shadow-sm">
      <div className="max-w-container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="text-lg font-semibold" href="/">
            My Finances
          </Link>
          <div className="flex items-center space-x-4">
            <form action={signout}>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
