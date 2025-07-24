import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Logo } from "@/components/logo";
import { BRAND_NAME, routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.forgotPassword.name}`,
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
