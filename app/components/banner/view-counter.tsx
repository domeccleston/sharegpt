import { nFormatter } from "@/lib/utils";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/tooltip";

export default function ViewCounter({ views }: { views: number }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-default p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all">
            <Eye className="h-4 w-4 text-gray-600" />
            <p className="text-center text-gray-600 text-sm">
              {nFormatter(views)}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Number of times this conversation has been viewed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
