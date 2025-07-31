"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteBalance } from "@/lib/actions";
import type { Balance } from "@/lib/types";
import { formatBalanceType } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props {
  balance: Balance;
}

export function DeleteBalanceAlert({ balance }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const balanceTypeTitle = formatBalanceType(balance.type);
  const formattedBalanceType = balanceTypeTitle.toLowerCase();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBalance(balance.id);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`${balanceTypeTitle} apagado com sucesso!`);
        setIsOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Apagar {formattedBalanceType}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar {formattedBalanceType}</AlertDialogTitle>
          <AlertDialogDescription>
            Tens a certeza que queres apagar este {formattedBalanceType}? Esta
            ação não pode ser revertida.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={handleDelete} loading={isPending}>
            Apagar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
