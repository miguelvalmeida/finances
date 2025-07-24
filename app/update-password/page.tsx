import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Logo } from "@/components/logo";
import { UpdatePasswordForm } from "@/components/update-password-form";
import { BRAND_NAME, routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.updatePassword.name}`,
};

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { token_hash } = await searchParams;

  if (!token_hash) {
    redirect("/");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
