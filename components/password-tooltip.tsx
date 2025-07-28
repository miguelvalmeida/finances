"use client";

import { HelpCircle } from "lucide-react";

import { useIsMobileOrTablet } from "@/hooks/use-media-query";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

function PasswordRequirementsList() {
  return (
    <ul className="lg:text-xs space-y-0.5">
      <li>• Mínimo de 8 caracteres</li>
      <li>• Pelo menos uma letra minúscula</li>
      <li>• Pelo menos uma letra maiúscula</li>
      <li>• Pelo menos um número</li>
      <li>• Pelo menos um símbolo (@$!%*?&)</li>
    </ul>
  );
}

export function PasswordTooltip() {
  const isMobileOrTablet = useIsMobileOrTablet();

  if (isMobileOrTablet) {
    return (
      <Drawer>
        <DrawerTrigger>
          <HelpCircle size={16} className="text-gray-400 " />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Requisitos da palavra-passe</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <PasswordRequirementsList />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <HelpCircle
          size={16}
          className="text-gray-400 hover:text-gray-600 cursor-help"
        />
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs space-y-1">
        <p className="font-medium text-xs">Requisitos da palavra-passe:</p>
        <PasswordRequirementsList />
      </TooltipContent>
    </Tooltip>
  );
}
