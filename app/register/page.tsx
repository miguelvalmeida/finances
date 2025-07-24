import type { Metadata } from "next";

import { SignUpForm } from "@/components/signup-form";
import { Logo } from "@/components/logo";
import { BRAND_NAME, routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.signIn.name}`,
};

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <SignUpForm />
      </div>
    </div>
  );
}
