import type { Metadata } from "next";

import { EditPasswordForm } from "@/components/edit-password-form";
import { EditProfileForm } from "@/components/edit-profile-form";
import { createClient } from "@/lib/supabase/server";
import { BRAND_NAME, routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | ${routes.account.name}`,
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Definições da conta
        </h1>
        <p className="text-muted-foreground">
          Gere a informação e preferências da tua conta
        </p>
      </div>
      <EditProfileForm userData={data.user} />
      <EditPasswordForm />
    </div>
  );
}
