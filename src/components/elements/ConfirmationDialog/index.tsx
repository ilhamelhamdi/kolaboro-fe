import { Button } from "@/components/ui/button";
import React from "react";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  setConfirmDialogOpen: (isOpen: boolean) => void;
}

const ConfimationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => {
        props.setConfirmDialogOpen(false);
      }}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-md mx-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-bold text-xl">{props.title}</h2>
        <div className="flex items-center space-x-2 my-8">
          <p>{props.message}</p>
        </div>
        <div className="flex justify-between gap-x-4">
          <Button variant="secondary" onClick={props.onCancel} className="grow">
            Cancel
          </Button>
          <Button variant="destructive" onClick={props.onConfirm} className="grow">
            {props.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfimationDialog;
