"use client";

import { AlertCircle, Loader2, User as UserIcon } from "lucide-react";
import z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

import { updateUser } from "@/lib/actions";

import { Alert, AlertDescription } from "./ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  userData: User;
}

const formSchema = z.object({
  name: z.string().min(1, { error: "Insere um nome" }),
  email: z.email(),
});

type EditProfileFormData = z.infer<typeof formSchema>;

export function EditProfileForm({ userData }: Props) {
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.user_metadata.full_name as string | undefined,
      email: userData.email,
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: EditProfileFormData) => {
    startTransition(async () => {
      const result = await updateUser(data);

      if (result?.error) {
        form.setError("root", { message: result.error });
      }

      toast.success("Informações do perfil atualizadas com sucesso");
      form.reset(data);
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="size-4" />
              Informação do perfil
            </CardTitle>
            <CardDescription>
              Altere o seu nome ou visualize o seu email associado à conta.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="email" disabled {...field} />
                  </FormControl>
                  <FormDescription>
                    O endereço de email não pode ser alterado. Contacta o
                    suporte se precisares de o atualizar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending || !form.formState.isDirty}
              className="w-1/5"
            >
              {isPending && <Loader2 className="animate-spin" />}
              Guardar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
