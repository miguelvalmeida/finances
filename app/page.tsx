import { redirect } from "next/navigation";

import { routes } from "@/lib/constants";

export default function Page() {
  redirect(routes.dashboard.url);
}
