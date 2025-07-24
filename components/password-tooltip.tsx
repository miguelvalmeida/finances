import { HelpCircle } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function PasswordTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs space-y-1">
        <p className="font-medium text-xs">Requisitos da palavra-passe:</p>
        <ul className="text-xs space-y-0.5">
          <li>• Mínimo de 8 caracteres</li>
          <li>• Pelo menos uma letra minúscula</li>
          <li>• Pelo menos uma letra maiúscula</li>
          <li>• Pelo menos um número</li>
          <li>• Pelo menos um símbolo (@$!%*?&)</li>
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}
