"use client";
import React, { useEffect, useReducer, useState } from "react";
import {
  AddNoteMessage,
  BaseStreamMessage,
  CanvasPageProps,
  DeleteNoteMessage,
  EditNoteMessage,
  GetCanvasResponse,
  RefreshCanvasMessage,
  RefreshNoteMessage,
} from "./interface";
import Link from "next/link";
import NoteCard from "./NoteCard";
import { useAuth } from "@/components/context/AuthContext";
import AddNoteButton from "./AddNoteButton";
import NoteModalForm from "./NoteFormModal";
import {
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  notesReducer,
  REFRESH_NOTES,
} from "@/components/reducer/NotesReducer";
import { Note } from "@/components/models/Note";
import { Canvas } from "@/components/models/Canvas";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getDeltaTime } from "@/components/utils/TimeUtils";

function CanvasPage({ params }: CanvasPageProps) {
  const resolvedParams = React.use(params); // Unwrap the params Promise
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessToken, user } = useAuth();

  const getCanvasId = () => {
    const address = resolvedParams.address;
    const slug = address[address.length - 1].split("-");
    return parseInt(slug[slug.length - 1]);
  };

  const fetchCanvas = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/canvas/${getCanvasId()}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (response.ok) {
      const jsonResponse: GetCanvasResponse = await response.json();
      setCanvas(jsonResponse.data);
    } else {
      console.error("Error fetching canvas");
    }
    setIsLoading(false);
  };

  const handleMessage = (message: BaseStreamMessage) => {
    switch (message.event) {
      case "refresh_canvas":
        setCanvas((message as RefreshCanvasMessage).message);
        break;
      case REFRESH_NOTES:
        dispatchNotes({ type: REFRESH_NOTES, payload: (message as RefreshNoteMessage).message });
        break;
      case ADD_NOTE:
        dispatchNotes({ type: ADD_NOTE, payload: (message as AddNoteMessage).message });
        break;
      case EDIT_NOTE:
        dispatchNotes({ type: EDIT_NOTE, payload: (message as EditNoteMessage).message });
        break;
      case DELETE_NOTE:
        dispatchNotes({ type: DELETE_NOTE, payload: (message as DeleteNoteMessage).message });
        break;
      default:
        break;
    }
  };

  const handleRealtimeStream = () => {
    const token = getAccessToken();
    const canvasId = getCanvasId();
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/stream/${canvasId}?accessToken=${token}`
    );

    ws.onopen = () => {
      console.log("Connected to the server");
    };

    ws.onmessage = (message) => {
      try {
        const data: BaseStreamMessage = JSON.parse(message.data);
        handleMessage(data);
      } catch (error) {
        console.error("Error parsing message", error);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from the server");
    };
  };

  useEffect(() => {
    fetchCanvas();
    handleRealtimeStream();
  }, []);

  if (isLoading) {
    return (
      <main className="w-screen h-screen flex">
        <div className="flex py-4 px-8 w-full">
          <Link href="/dashboard" className="font-bold text-xl p-4">
            Kolaboro
          </Link>
          <div className="ml-20 flex flex-col">
            <div className="flex justify-between ">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-10" />
            </div>
            <Skeleton className="h-8 w-60 mt-4" />
          </div>
        </div>
      </main>
    );
  }

  // Error fetching canvas
  if (!canvas) {
    return (
      <div className="bg-[#4e4066] w-screen h-screen text-white flex justify-center items-center">
        <div className="max-w-screen-sm flex flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-2xl">404 – Not found</h1>
          <p>
            Whatever you were looking for at this address doesn&apos;t really live here anymore or
            never lived here at all. Unless, of course, you came all the way here to see this
            message in which case: &quot;Hello, beautiful!&quot;
          </p>
          <Link href="/" className="button">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <div
        id="canvas-background"
        style={{ backgroundImage: `url('${canvas.background}')` }}
        className="w-screen h-screen bg-cover fixed top-0 left-0 -z-50"
      ></div>
      <div id="canvas-header" className="flex py-4 px-8 w-full">
        <Link href="/" className="font-bold text-xl">
          Kolaboro
        </Link>
        <div className="ml-20 flex flex-col">
          <div className="flex justify-between text-sm">
            <span>{canvas.owner.displayName}</span>
            <span>{getDeltaTime(canvas.createdAt)}</span>
          </div>
          <h1 className="font-semibold text-3xl">{canvas.title}</h1>
        </div>
      </div>
      <div id="canvas-space" className="relative w-full h-full grow">
        {notes.map((note) => (
          <NoteCard
            key={`${note.id}-${note.updatedAt}`}
            note={note}
            isEditable={canvas.owner.id === user.id || note.authorId === user.id} // Only allow editing if user is the owner of the canvas or the author of the note
            onEdit={(n) => {
              setActiveNote(n);
              setFormModalOpen(true);
            }}
          />
        ))}
      </div>

      <AddNoteButton
        onClick={() => {
          setFormModalOpen(true);
        }}
      />

      {isFormModalOpen && (
        <NoteModalForm
          setModalOpen={setFormModalOpen}
          canvasId={getCanvasId()}
          currentNote={activeNote}
          clearCurrentNote={() => setActiveNote(null)}
        />
      )}
    </main>
  );
}

export default CanvasPage;
