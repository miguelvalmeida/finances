import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function PasswordInput({ ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 size-6"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        <span className="sr-only">
          {showPassword ? "Ocultar password" : "Mostrar password"}
        </span>
      </Button>
    </div>
  );
}
