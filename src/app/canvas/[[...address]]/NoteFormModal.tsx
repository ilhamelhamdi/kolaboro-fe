import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import RichEditor from "./RichEditor";
import { createNoteRequest, Note, NoteRequest } from "@/components/models/Note";
import { useAuth } from "@/components/context/AuthContext";

interface NoteModalFormProps {
  setModalOpen: (isOpen: boolean) => void;
  canvasId: number;
  currentNote: Note | null; // This is the note that is being edited
  clearCurrentNote: () => void;
}

function NoteModalForm({
  setModalOpen,
  canvasId,
  currentNote,
  clearCurrentNote,
}: NoteModalFormProps) {
  const [subject, setSubject] = React.useState(currentNote?.subject || "");
  const [body, setBody] = React.useState(currentNote?.body || "");

  const { getAccessToken } = useAuth();

  const handleAddNote = async () => {
    const reqBody: NoteRequest = createNoteRequest(canvasId, subject, body);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      setModalOpen(false);
    }
  };

  const handleEditNote = async () => {
    if (!currentNote) return;
    const reqBody: NoteRequest = {
      canvasId,
      subject,
      body,
      positionLeft: currentNote.positionLeft,
      positionTop: currentNote.positionTop,
      width: currentNote.width,
      zIndex: currentNote.zIndex,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${currentNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      setModalOpen(false);
      clearCurrentNote();
    }
  };

  const onSubmit = () => {
    if (currentNote) {
      handleEditNote();
    } else {
      handleAddNote();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        setModalOpen(false);
        clearCurrentNote();
      }}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-[425px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-lg font-bold">{currentNote ? "Edit note" : "Add a note"}</h2>
        <div className="mt-2 space-y-4">
          <div>
            <Label className="block mb-1 font-medium">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter a subject"
            />
          </div>
          <div>
            <Label className="block mb-1 font-medium">Body</Label>
            <RichEditor onHtmlChange={setBody} initialHtml={body} />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={onSubmit} className="w-full">
            {currentNote ? "Update" :"Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NoteModalForm;
