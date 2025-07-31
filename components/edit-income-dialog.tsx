"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { editIncome } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Income } from "@/lib/types";

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
import { IncomeForm, type IncomeFormData } from "./income-form";

interface Props {
  income: Income;
}

export function EditIncomeDialog({ income }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: IncomeFormData = {
    name: income.name,
    amount: String(income.amount),
    category: income.category,
    type: income.type,
    date: new Date(income.date),
    status: income.status,
  };

  const handleSubmit = async (data: IncomeFormData) => {
    startTransition(async () => {
      const result = await editIncome(income.id, data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Rendimento editado com sucesso!");
        setIsOpen(false);
      }
    });
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm">
            <Pencil size={16} />
            <span className="sr-only">Editar rendimento</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar rendimento</DrawerTitle>
            <DrawerDescription>
              Faz alterações aos detalhes do teu rendimento
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <IncomeForm
                variant="edit"
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
          <span className="sr-only">Editar rendimento</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar rendimento</DialogTitle>
          <DialogDescription>
            Faz alterações aos detalhes do teu rendimento
          </DialogDescription>
        </DialogHeader>
        <IncomeForm
          variant="edit"
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
          <Button type="submit" form="edit-income" loading={isPending}>
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
