"use client";

import { useTransition } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { deleteUser } from "@/lib/actions";

import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialog,
} from "./ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

export function DeleteAccount() {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser();

      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle size={16} />
          Eliminar conta
        </CardTitle>
        <CardDescription>
          Assim que eliminares a tua conta, não há como voltar atrás.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Apagar conta</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tens a certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Isto irá eliminar permanentemente a tua conta e remover todos os
                teus dados dos nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button onClick={handleDelete} loading={isPending}>
                Sim, eliminar a minha conta
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
