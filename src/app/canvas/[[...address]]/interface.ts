import { BaseResponse } from "@/app/interface";
import { Canvas } from "@/components/models/Canvas";
import { Note, NoteId } from "@/components/models/Note";

export interface CanvasPageProps {
  params: Promise<{ address: string[] }>
}

export interface GetCanvasResponse extends BaseResponse<Canvas> {}

export interface BaseStreamMessage {
  topic: number;
  event: string;
}

export interface StreamMessage<T> extends BaseStreamMessage {
  message: T;
}

export interface RefreshCanvasMessage extends StreamMessage<Canvas> { }

export interface RefreshNoteMessage extends StreamMessage<Note[]> { }
export interface AddNoteMessage extends StreamMessage<Note> { }
export interface EditNoteMessage extends StreamMessage<Note> { }
export interface DeleteNoteMessage extends StreamMessage<NoteId> { }