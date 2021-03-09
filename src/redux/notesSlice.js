import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '1',
        name: 'Can\'t Hurt Me',
        author: '1',
        category: '2',
        state: 'Read',
        notes: '<p>Note 1 with <strong>bold</strong> text<p>',
        created: new Date("2021-03-09"),
    },
    {
        id: '2',
        name: 'Deep Work',
        author: '2',
        category: '1',
        state: 'Read',
        notes: '<p>Note 2 with <em>italic</em> text<p>',
        created: new Date("2021-03-08"),
    }
]

const notesSlice = createSlice({
    name: 'notes',
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
                        notes: '',
                        name,
                        author,
                        category,
                        state,
                    }
                };
            }
        },
        noteUpdated(state, action) {
            const { id, changes } = action.payload;
            const existingNote = state.find(note => note.id === id);
            const existingNoteIndex = state.findIndex(note => note === existingNote);
            if (existingNote) {
                state[existingNoteIndex] = {
                    ...existingNote,
                    ...changes
                };
            }
        },
        noteDeleted(state, action) {
            const id = action.payload;
            state = state.filter(note => note.id !== id);
            return state;
        }
    }
});


export default notesSlice.reducer;

export const { noteAdded, noteUpdated, noteDeleted } = notesSlice.actions;

export const selectNoteById = (state, noteId) => 
    state.notes.find(note => note.id === noteId)