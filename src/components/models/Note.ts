export type NoteId = number;

export interface Note {
  id: NoteId;
  canvasId: number;
  authorId: number;
  subject: string;
  body: string;
  positionLeft: number;
  positionTop: number;
  zIndex: number;
  width: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRequest {
  canvasId: number;
  subject: string;
  body: string;
  positionLeft: number;
  positionTop: number;
  width: number;
  zIndex: number;
}

const DEFAULT_WIDTH = 300;
const DEFAULT_POSITION_LEFT = 16;
const DEFAULT_POSITION_TOP = 16;
const DEFAULT_Z_INDEX = 1;

export const createNoteRequest = (
  canvasId: number,
  subject: string,
  body: string,
  positionLeft: number = DEFAULT_POSITION_LEFT,
  positionTop: number = DEFAULT_POSITION_TOP,
  width: number = DEFAULT_WIDTH,
  zIndex: number = DEFAULT_Z_INDEX
): NoteRequest => {
  return {
    canvasId,
    subject,
    body,
    positionLeft,
    positionTop,
    width,
    zIndex,
  };
}