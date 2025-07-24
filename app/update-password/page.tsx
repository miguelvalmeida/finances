import { Logo } from "@/components/logo";
import { UpdatePasswordForm } from "@/components/update-password-form";

import { redirect } from "next/navigation";

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
