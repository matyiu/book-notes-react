import { createSlice } from "@reduxjs/toolkit";

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
    reducers: {}
});

export default notesSlice.reducer;