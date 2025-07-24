"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signup } from "@/lib/actions";
import { passwordSchema } from "@/lib/validation";
import { BRAND_NAME, routes } from "@/lib/constants";

import { Alert, AlertDescription } from "./ui/alert";
import { PasswordTooltip } from "./password-tooltip";
import { PasswordInput } from "./password-input";
import { LoginWithGoogle } from "./login-with-google";

const formSchema = z
  .object({
    name: z.string().min(1, { error: "Please enter a name" }),
    email: z.email({
      error: "Insere um endereço de email válido.",
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As palavras-passe não coincidem",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof formSchema>;

export function SignUpForm() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: SignupFormData) => {
    startTransition(async () => {
      const result = await signup(data);

      if (result?.error) {
        form.setError("root", { message: result.error });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Cria a tua conta</CardTitle>
        <CardDescription>
          {`Preenche os teus dados para criares uma nova conta e começares a gerir
          as tuas finanças com o ${BRAND_NAME}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircle size={16} />
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Palavra-passe</FormLabel>
                    <PasswordTooltip />
                  </div>
                  <FormControl>
                    <PasswordInput required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar palavra-passe</FormLabel>
                  <FormControl>
                    <PasswordInput required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              Registar
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Ou continua com
          </span>
        </div>
        <LoginWithGoogle variant="register" />
        <div className="text-center text-sm">
          Ja tens uma conta?{" "}
          <Link
            href={routes.signIn.url}
            className="underline underline-offset-4"
          >
            Iniciar sessão
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
