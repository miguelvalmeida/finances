"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { addIncome } from "@/lib/actions";
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
import { IncomeForm, type IncomeFormData } from "./income-form";

export function AddIncomeDialog() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: IncomeFormData = {
    name: "",
    amount: "",
    category: "salary",
    type: "one-time",
    date: new Date(),
    status: "received",
  };

  const handleSubmit = async (data: IncomeFormData) => {
    startTransition(async () => {
      const result = await addIncome(data);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Rendimento adicionada com sucesso!");
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
            Adicionar rendimento
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar rendimento</DrawerTitle>
            <DrawerDescription>
              Adiciona um novo rendimento para acompanhar e gerir os teus ganhos
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <IncomeForm
                variant="add"
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="add-income" loading={isPending}>
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
          Adicionar rendimento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar rendimento</DialogTitle>
          <DialogDescription>
            Adiciona um novo rendimento para acompanhar e gerir os teus ganhos
          </DialogDescription>
        </DialogHeader>
        <IncomeForm
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
          <Button type="submit" form="add-income" loading={isPending}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
