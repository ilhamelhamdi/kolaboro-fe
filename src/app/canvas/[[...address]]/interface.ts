import { BaseResponse } from "@/app/interface";
import { Canvas } from "@/components/models/Canvas";
import { Note, NoteId } from "@/components/models/Note";

export interface CanvasPageProps {
  params: Promise<{ address: string[] }>
}

export type GetCanvasResponse = BaseResponse<Canvas>

export interface BaseStreamMessage {
  topic: number;
  event: string;
}

export interface StreamMessage<T> extends BaseStreamMessage {
  message: T;
}

export type RefreshCanvasMessage = StreamMessage<Canvas>;
export type RefreshNoteMessage = StreamMessage<Note[]>;
export type AddNoteMessage = StreamMessage<Note>;
export type EditNoteMessage = StreamMessage<Note>;
export type DeleteNoteMessage = StreamMessage<NoteId>;