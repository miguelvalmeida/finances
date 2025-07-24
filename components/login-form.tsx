"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import { login } from "@/lib/actions";
import { routes } from "@/lib/constants";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Form, FormItem, FormField, FormLabel, FormControl } from "./ui/form";
import { Alert, AlertDescription } from "./ui/alert";
import { PasswordInput } from "./password-input";
import { LoginWithGoogle } from "./login-with-google";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      const result = await login(data.email, data.password);

      if (result?.error) {
        form.setError("root", { message: result.error });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bem vindo de volta</CardTitle>
        <CardDescription>
          Introduz os teus dados para acederes à tua conta
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavra-passe</FormLabel>
                  <FormControl>
                    <PasswordInput required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              Iniciar sessão
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Ou continua com
          </span>
        </div>
        <LoginWithGoogle variant="login" />
        <div className="grid gap-2 justify-center">
          <div className="text-center text-sm">
            Não tens uma conta?{" "}
            <Link
              href={routes.signUp.url}
              className="underline underline-offset-4"
            >
              Registar
            </Link>
          </div>
          <div className="text-center text-sm">
            Esqueceste-te da palavra-passe?{" "}
            <Link
              href={routes.forgotPassword.url}
              className="underline underline-offset-4"
            >
              Recuperar
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
