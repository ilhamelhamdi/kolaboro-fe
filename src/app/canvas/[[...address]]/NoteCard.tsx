"use client";
import { BaseResponse } from "@/app/interface";
import { useAuth } from "@/components/context/AuthContext";
import ConfimationDialog from "@/components/elements/ConfirmationDialog";
import Draggable from "@/components/elements/Draggable/index";
import { Note, NoteRequest } from "@/components/models/Note";
import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { getDeltaTime } from "@/components/utils/TimeUtils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  isEditable: boolean;
  note: Note;
  onEdit: (note: Note) => void;
}

interface NoteAuthor {
  id: number;
  username: string;
  display_name: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ isEditable, note, onEdit }) => {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [author, setAuthor] = useState<NoteAuthor | null>();

  const { getAccessToken } = useAuth();
  const handleDragEnd = (x: number, y: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
      body: JSON.stringify({
        canvasId: note.canvasId,
        subject: note.subject,
        body: note.body,
        width: note.width,
        zIndex: note.zIndex,
        positionLeft: x,
        positionTop: y,
      } as NoteRequest),
    });
  };

  const handleDeleteNote = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${note.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("Failed to delete note");
    }
    setConfirmDialogOpen(false);
  };

  const fetchNoteAuthorProfile = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile?id=${note.authorId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (response.ok) {
      const jsonResponse: BaseResponse<NoteAuthor> = await response.json();
      setAuthor(jsonResponse.data);
    } else {
      console.error("Error fetching note author profile");
    }
  };

  useEffect(() => {
    fetchNoteAuthorProfile();
  }, []);

  return (
    <>
      {isConfirmDialogOpen && (
        <ConfimationDialog
          title="Delete Note?"
          message="Are you sure you want to delete this note? This cannot be undone!"
          confirmText="Delete"
          onConfirm={handleDeleteNote}
          onCancel={() => setConfirmDialogOpen(false)}
          setConfirmDialogOpen={setConfirmDialogOpen}
        />
      )}
      <Draggable
        initialPosition={{ x: note.positionLeft, y: note.positionTop }}
        onDragEnd={handleDragEnd}
        isDraggable={isEditable}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <Card style={{ width: note.width }} className={`p-2`}>
              <div className="text-xs">
                {author ? (
                  <Link href={`/profile/${author.username}`}>
                    <span className="font-bold underline">{author.display_name}</span>
                  </Link>
                ) : (
                  <span className="font-bold">Unknown</span>
                )}
                <span className="ml-2 text-slate-400">{getDeltaTime(note.createdAt)}</span>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-lg">{note.subject}</h3>
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: note.body }} />
              </div>
            </Card>
          </ContextMenuTrigger>
          {isEditable && (
            <ContextMenuContent>
              <ContextMenuItem onClick={() => onEdit(note)}>Edit</ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setConfirmDialogOpen(true);
                }}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
      </Draggable>
    </>
  );
};

export default NoteCard;
