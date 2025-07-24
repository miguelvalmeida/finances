import { PiggyBank } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 self-center font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <PiggyBank className="size-4" />
      </div>
      Tostões
    </div>
  );
}
