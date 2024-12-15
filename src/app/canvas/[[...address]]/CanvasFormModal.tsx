import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import RichEditor from "./RichEditor";
import { createNoteRequest, Note, NoteRequest } from "@/components/models/Note";
import { useAuth } from "@/components/context/AuthContext";
import { Canvas } from "@/components/models/Canvas";
import { CreateCanvasRequest } from "@/app/dashboard/interface";

interface CanvasFormModalProps {
  canvas: Canvas;
  setModalOpen: (isOpen: boolean) => void;
}

function CanvasFormModal({ canvas, setModalOpen }: CanvasFormModalProps) {
  const [title, setTitle] = React.useState(canvas.title);

  const { getAccessToken } = useAuth();

  const handleUpdateCanvas = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas/${canvas.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        background: canvas.background,
      } as CreateCanvasRequest),
    });

    if (response.ok) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        setModalOpen(false);
      }}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-[425px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-lg font-bold">{"Edit Canvas"}</h2>
        <div className="mt-2 space-y-4">
          <div>
            <Label className="block mb-1 font-medium">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleUpdateCanvas} disabled={title.length === 0} className="w-full">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CanvasFormModal;
