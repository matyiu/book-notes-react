import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import fetchWrapper from '../app/fetchWrapper'

const initialState = []

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteUpdated(state, action) {
            const { id, changes } = action.payload
            const existingNote = state.find((note) => note.id === id)
            const existingNoteIndex = state.findIndex(
                (note) => note === existingNote
            )
            if (existingNote) {
                state[existingNoteIndex] = {
                    ...existingNote,
                    ...changes,
                }
            }
        },
        noteDeleted(state, action) {
            const id = action.payload
            state = state.filter((note) => note.id !== id)
            return state
        },
        setNotes(state, action) {
            state = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNote.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                state.push(action.payload.data)
            }
        })
    },
})

export default notesSlice.reducer

export const { noteUpdated, noteDeleted, setNotes } = notesSlice.actions

export const selectNoteById = (state, noteId) =>
    state.notes.find((note) => note.id === noteId)

export const createNote = createAsyncThunk('create', async (noteData) => {
    const raw = await fetchWrapper.post('http://boonote.test:8000/api/notes', {
        body: JSON.stringify(noteData),
    })

    return await raw.json()
})
