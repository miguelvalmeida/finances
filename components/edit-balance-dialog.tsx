"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { editBalance } from "@/lib/actions";
import { useIsMobile } from "@/hooks/use-media-query";
import type { Balance } from "@/lib/types";
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
import { BalanceForm, BalanceFormData } from "./balance-form";

interface Props {
  balance: Balance;
}

export function EditBalanceDialog({ balance }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const formDefaultValues: BalanceFormData = {
    name: balance.name,
    value: String(balance.value),
  };

  const balanceTypeTitle = formatBalanceType(balance.type);
  const formattedBalanceType = balanceTypeTitle.toLowerCase();

  const handleSubmit = async (data: BalanceFormData) => {
    startTransition(async () => {
      const result = await editBalance(balance.id, {
        ...data,
        type: balance.type,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`${balanceTypeTitle} editado com sucesso!`);
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
            <span className="sr-only">Editar {formattedBalanceType}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar {formattedBalanceType}</DrawerTitle>
            <DrawerDescription>
              Faz alterações aos detalhes do teu {formattedBalanceType}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="p-4">
              <BalanceForm
                variant="edit"
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
              />
            </div>
            <DrawerFooter>
              <Button type="submit" form="edit-balance" loading={isPending}>
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
          <span className="sr-only">Editar {formattedBalanceType}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {formattedBalanceType}</DialogTitle>
          <DialogDescription>
            Faz alterações aos detalhes do teu {formattedBalanceType}
          </DialogDescription>
        </DialogHeader>
        <BalanceForm
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
          <Button type="submit" form="edit-balance" loading={isPending}>
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
