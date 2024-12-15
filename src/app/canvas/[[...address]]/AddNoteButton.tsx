import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import React from "react";

interface AddNoteButtonProps {
  onClick: () => void;
}

function AddNoteButton({ onClick }: AddNoteButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          className="rounded-full fixed bottom-10 right-10 h-[48px] w-[48px]"
        >
          <Plus />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="bg-white p-2 rounded text-sm mb-2">Add a note</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default AddNoteButton;
