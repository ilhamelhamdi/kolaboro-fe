import { Note } from "@/components/models/Note";

// Define action types
export const REFRESH_NOTES = "refresh_notes";
export const ADD_NOTE = "add_note";
export const EDIT_NOTE = "edit_note";
export const DELETE_NOTE = "delete_note";

export type Action =
  | { type: typeof REFRESH_NOTES; payload: Note[] }
  | { type: typeof ADD_NOTE; payload: Note }
  | { type: typeof EDIT_NOTE; payload: Note }
  | { type: typeof DELETE_NOTE; payload: number };

// Define the reducer function
export const notesReducer = (state: Note[], action: Action): Note[] => {
  switch (action.type) {
    case REFRESH_NOTES:
      return action.payload;
    case ADD_NOTE:
      return [...state, action.payload];
    case EDIT_NOTE:
      return state.map((note) => (note.id === action.payload.id ? action.payload : note));
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
};
