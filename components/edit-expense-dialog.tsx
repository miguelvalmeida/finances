"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { editExpense } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Expense } from "@/lib/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { ExpenseForm, type ExpenseFormData } from "./expense-form";

interface Props {
  expense: Expense;
}

export function EditExpenseDialog({ expense }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: ExpenseFormData = {
    name: expense.name,
    amount: String(expense.amount),
    date: expense.date ? new Date(expense.date) : undefined,
    status: expense.status,
    recurrence: expense.recurrence,
  };

  const handleSubmit = async (data: ExpenseFormData) => {
    startTransition(async () => {
      const result = await editExpense(expense.id, data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Despesa editada com sucesso!");
        setIsOpen(false);
      }
    });
  };

  const expenseType =
    expense.recurrence === "one-time" ? "one-time" : "recurring";

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm">
            <Pencil size={16} />
            <span className="sr-only">Editar despesa</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar despesa</DrawerTitle>
            <DrawerDescription>
              Faz alterações aos detalhes da tua despesa
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <ExpenseForm
                variant="edit"
                type={expenseType}
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="edit-expense" loading={isPending}>
                Editar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil size={16} />
          <span className="sr-only">Editar despesa</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar despesa</DialogTitle>
          <DialogDescription>
            Faz alterações aos detalhes da tua despesa
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          variant="edit"
          type={expenseType}
          defaultValues={formDefaultValues}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="edit-expense" loading={isPending}>
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
