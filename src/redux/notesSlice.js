import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: '1',
        name: 'Can\'t Hurt Me',
        author: 'David Goggins',
        category: 'Autobiography',
        state: 'Read',
        notes: '<p>Note 1 with <strong>bold</strong> text<p>'
    },
    {
        id: '2',
        name: 'Deep Work',
        author: 'Cal Newport',
        category: 'Productivity',
        state: 'Read',
        notes: '<p>Note 2 with <em>italic</em> text<p>'
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
                        notes: '',
                        name,
                        author,
                        category,
                        state,
                    }
                };
            }
        }
    }
});


export default notesSlice.reducer;

export const { noteAdded } = notesSlice.actions;

export const selectNoteById = (state, noteId) => 
    state.notes.find(note => note.id === noteId)