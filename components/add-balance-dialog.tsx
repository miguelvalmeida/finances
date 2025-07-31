"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { addBalance } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";

import type { BalanceType } from "@/lib/types";
import { formatBalanceType } from "@/lib/utils";

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
import { BalanceForm, type BalanceFormData } from "./balance-form";

interface Props {
  type: BalanceType;
}

export function AddBalanceDialog({ type }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: BalanceFormData = {
    name: "",
    value: "",
  };

  const balanceTypeTitle = formatBalanceType(type);
  const formattedBalanceType = balanceTypeTitle.toLowerCase();

  const handleSubmit = async (data: BalanceFormData) => {
    startTransition(async () => {
      const result = await addBalance({ ...data, type });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`${balanceTypeTitle} adicionado com sucesso!`);
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
            <span className="sr-only">Adicionar {formattedBalanceType}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar {formattedBalanceType}</DrawerTitle>
            <DrawerDescription>
              Adiciona um novo {formattedBalanceType} para acompanhar e gerir o
              teu património
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <BalanceForm
                variant="add"
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="add-balance" loading={isPending}>
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
          <span className="sr-only xl:not-sr-only">
            Adicionar {formattedBalanceType}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar {formattedBalanceType}</DialogTitle>
          <DialogDescription>
            Adiciona um novo {formattedBalanceType} para acompanhar e gerir o
            teu património
          </DialogDescription>
        </DialogHeader>
        <BalanceForm
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
          <Button type="submit" form="add-balance" loading={isPending}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
