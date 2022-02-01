import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteAdded: {
      reducer(state, action) {
        state = state.concat([action.payload]);
        return state;
      },
      prepare(name, author, category, state) {
        return {
          payload: {
            id: nanoid(),
            created: new Date(),
            notes: "",
            name,
            author,
            category,
            state,
          },
        };
      },
    },
    noteUpdated(state, action) {
      const { id, changes } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      const existingNoteIndex = state.findIndex(
        (note) => note === existingNote
      );
      if (existingNote) {
        state[existingNoteIndex] = {
          ...existingNote,
          ...changes,
        };
      }
    },
    noteDeleted(state, action) {
      const id = action.payload;
      state = state.filter((note) => note.id !== id);
      return state;
    },
    setNotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export default notesSlice.reducer;

export const { noteAdded, noteUpdated, noteDeleted, setNotes } =
  notesSlice.actions;

export const selectNoteById = (state, noteId) =>
  state.notes.find((note) => note.id === noteId);
