"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { login, loginWithGoogle } from "@/lib/actions";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormField, FormLabel, FormControl } from "./ui/form";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" required {...field} />
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
        <form action={loginWithGoogle}>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Iniciar sessão com o Google
          </Button>
        </form>
        <div className="text-center text-sm">
          Não tens uma conta?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Registar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
