import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import fetchWrapper from '../app/fetchWrapper'
import loadingMap from '../app/loadingMap'

const initialState = {
    data: [],
    status: loadingMap.get(0),
    message: null,
}

const setLoadingStatus = (state) => {
    state.status = loadingMap.get(1)
}

const setSucceededStatus = (state) => {
    state.status = loadingMap.get(2)
    setTimeout(() => {
        state.status = loadingMap.get(0)
    }, 5000)
}

const setFailedStatus = (state, action) => {
    state.status = loadingMap.get(3)
    state.messsage = action.payload.messsage
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteUpdated(state, action) {
            const { id, changes } = action.payload
            const existingNote = state.data.find((note) => note.id === id)
            const existingNoteIndex = state.data.findIndex(
                (note) => note === existingNote
            )
            if (existingNote) {
                state.data[existingNoteIndex] = {
                    ...existingNote,
                    ...changes,
                }
            }
        },
        noteDeleted(state, action) {
            const id = action.payload
            state.data = state.data.filter((note) => note.id !== id)
            return state
        },
        setNotes(state, action) {
            state.data = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNote.pending, setLoadingStatus)
        builder.addCase(createNote.rejected, setFailedStatus)

        builder.addCase(createNote.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                state.data.push(action.payload.data)
                setSucceededStatus(state)
            } else {
                setFailedStatus(state, action)
            }
        })

        builder.addCase(noteUpdated.pending, setLoadingStatus)
        builder.addCase(noteUpdated.rejected, setFailedStatus)
        builder.addCase(noteUpdated.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                const updatedNote = action.payload.data
                const index = state.data.findIndex(
                    (note) => note.id === updatedNote.id
                )
                state.data.splice(index, 1, updatedNote)
                setSucceededStatus(state)
            } else {
                setFailedStatus(state, action)
            }
        })
    },
})

export default notesSlice.reducer

export const { noteDeleted, setNotes } = notesSlice.actions

export const selectNoteById = (state, noteId) =>
    state.notes.data.find((note) => note.id === noteId)

export const noteUpdated = createAsyncThunk(
    'notes/update',
    async (noteData, { getState, rejectWithValue }) => {
        try {
            const note = getState().notes.data.find(
                (note) => note.id === noteData.id
            )
            const res = await fetchWrapper.put(
                'http://boonote.test:8000/api/notes/' + noteData.id,
                {
                    body: JSON.stringify({
                        ...note,
                        ...noteData.changes,
                    }),
                }
            )

            return res
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
