"use client";

import { AlertCircle, Loader2, Lock } from "lucide-react";
import z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updatePassword } from "@/lib/actions";
import { passwordSchema } from "@/lib/validation";

import { Alert, AlertDescription } from "./ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

type EditPasswordFormData = z.infer<typeof formSchema>;

export function EditPasswordForm() {
  const form = useForm<EditPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: EditPasswordFormData) => {
    startTransition(async () => {
      const result = await updatePassword(data.password);

      if (result?.error) {
        form.setError("root", { message: result.error });
      }

      toast.success("Palavra-passe atualizada com sucesso");
      form.reset();
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={16} />
              Palavra-passe & segurança
            </CardTitle>
            <CardDescription>
              Atualiza a tua palavra-passe para manter a tua conta segura
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending || !form.formState.isDirty}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Atualizar palavra-passe
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
