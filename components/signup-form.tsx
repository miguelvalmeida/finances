"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

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
import { useTransition } from "react";
import { loginWithGoogle, signup } from "@/lib/actions";
import { AlertCircle, HelpCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const formSchema = z
  .object({
    name: z.string().min(1, { error: "Please enter a name" }),
    email: z.email({
      error: "Insere um endereço de email válido.",
    }),
    password: z
      .string()
      .min(8, {
        error: "A palavra-passe deve ter pelo menos 8 caracteres.",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          error:
            "A palavra-passe deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
        }
      ),
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
          Preenche os teus dados para criares uma nova conta e começares a gerir
          as tuas finanças com o Tostões.
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
                    <Input placeholder="Insere o teu nome" {...field} />
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
                    <Input
                      type="email"
                      placeholder="Insere o teu email"
                      {...field}
                    />
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
                    <FormLabel>Password</FormLabel>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="max-w-xs space-y-1"
                      >
                        <p className="font-medium text-xs">
                          Requisitos da palavra-passe:
                        </p>
                        <ul className="text-xs space-y-0.5">
                          <li>• Mínimo de 8 caracteres</li>
                          <li>• Pelo menos uma letra minúscula</li>
                          <li>• Pelo menos uma letra maiúscula</li>
                          <li>• Pelo menos um número</li>
                          <li>• Pelo menos um símbolo (@$!%*?&)</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Insere uma password"
                      {...field}
                    />
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
                  <FormLabel>Confirmar password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirma a password"
                      {...field}
                    />
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
        <form action={loginWithGoogle}>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Registar com o Google
          </Button>
        </form>
        <div className="text-center text-sm">
          Ja tens uma conta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Iniciar sessão
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
