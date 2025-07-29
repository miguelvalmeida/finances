"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { addExpense } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";

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

export function AddExpenseDialog() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: ExpenseFormData = {
    name: "",
    amount: "",
    date: new Date(),
    status: "active",
    recurrence: "monthly",
  };

  const handleSubmit = async (data: ExpenseFormData) => {
    startTransition(async () => {
      const result = await addExpense(data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Despesa adicionada com sucesso!");
        setIsOpen(false);
      }
    });
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button>
            <Plus size={16} />
            Adicionar despesa
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar despesa</DrawerTitle>
            <DrawerDescription>
              Adiciona uma nova despesa para acompanhar e gerir os teus gastos
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <ExpenseForm
                variant="add"
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="add-expense" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Adicionar
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
        <Button>
          <Plus size={16} />
          Adicionar despesa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription>
            Adiciona uma nova despesa para acompanhar e gerir os teus gastos
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          variant="add"
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
          <Button type="submit" form="add-expense" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
