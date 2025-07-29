import type { Metadata } from "next";

import { BRAND_NAME, routes } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { EditPasswordForm } from "@/components/edit-password-form";
import { EditProfileForm } from "@/components/edit-profile-form";
import { DeleteAccount } from "@/components/delete-account";

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
    <div className="grid gap-4 md:gap-6 max-w-2xl">
      <EditProfileForm userData={data.user} />
      <EditPasswordForm />
      <DeleteAccount />
    </div>
  );
}
