"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updatePassword } from "@/lib/actions";
import { passwordSchema } from "@/lib/validation";
import { routes } from "@/lib/constants";

import { Alert, AlertDescription } from "./ui/alert";
import { PasswordTooltip } from "./password-tooltip";
import { PasswordInput } from "./password-input";

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As palavras-passe não coincidem",
    path: ["confirmPassword"],
  });

type UpdatePasswordFormData = z.infer<typeof formSchema>;

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (data: UpdatePasswordFormData) => {
    startTransition(async () => {
      const result = await updatePassword(data.password);

      if (result?.error) {
        form.setError("root", { message: result.error });
      } else {
        toast.success("Palavra-passe atualizada com sucesso!");
        router.push(routes.dashboard.url);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Alterar palavra-passe</CardTitle>
        <CardDescription>
          Cria uma nova palavra-passe segura para a tua conta
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Nova palavra-passe</FormLabel>
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
              Atualizar palavra-passe
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
