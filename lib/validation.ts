import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, {
    message: "A palavra-passe deve ter pelo menos 8 caracteres.",
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "A palavra-passe deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
  });
