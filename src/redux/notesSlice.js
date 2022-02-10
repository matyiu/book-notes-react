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

        builder.addCase(noteUpdated.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                const updatedNote = action.payload.data
                const index = state.findIndex(
                    (note) => note.id === updatedNote.id
                )
                state.splice(index, 1, updatedNote)
            }
        })
    },
})

export default notesSlice.reducer

export const { noteDeleted, setNotes } = notesSlice.actions

export const selectNoteById = (state, noteId) =>
    state.notes.find((note) => note.id === noteId)

export const noteUpdated = createAsyncThunk(
    'notes/update',
    async (noteData, { getState, rejectWithValue }) => {
        try {
            const note = getState().notes.find(
                (note) => note.id === noteData.id
            )
            const raw = await fetchWrapper.put(
                'http://boonote.test:8000/api/notes/' + noteData.id,
                {
                    body: JSON.stringify({
                        ...note,
                        ...noteData.changes,
                    }),
                }
            )

            return await raw.json()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const createNote = createAsyncThunk('create', async (noteData) => {
    const raw = await fetchWrapper.post('http://boonote.test:8000/api/notes', {
        body: JSON.stringify(noteData),
    })

    return await raw.json()
})
