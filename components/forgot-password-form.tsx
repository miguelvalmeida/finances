"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";

import { resetPassword } from "@/lib/actions";

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

const formSchema = z.object({
  email: z.email(),
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<"idle" | "success">("idle");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    startTransition(async () => {
      const result = await resetPassword(data.email);

      if (result?.error) {
        form.setError("root", { message: result.error });
      } else {
        setFormState("success");
      }
    });
  };

  if (formState === "success") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Mail size={24} className="text-green-600" />
          </div>
          <CardTitle className="text-xl">Link enviado com successo!</CardTitle>
          <CardDescription>
            Enviámos um link de recuperação para{" "}
            <strong>{form.getValues("email")}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <h4 className="font-bold text-blue-900">Próximos passos:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                1. Verifica a tua caixa de entrada (se não encontrares o email,
                verifica também a pasta de spam ou promoções).
              </li>
              <li>2. Abre o email e clica no link de recuperação.</li>
              <li>3. Segue as instruções para redefinir a tua password.</li>
            </ul>
          </div>
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
            >
              <ArrowLeft size={16} />
              Voltar ao início de sessão
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          Esqueceste-te da palavra-passe?
        </CardTitle>
        <CardDescription>
          Insere o teu email e enviaremos instruções para redefinires a tua
          palavra-passe.
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              Recuperar palavra-passe
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
          >
            <ArrowLeft size={16} />
            Voltar ao início de sessão
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
