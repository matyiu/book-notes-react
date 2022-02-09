import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = { author: [], category: [] }

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        categoryAdded: (state, action) => {
            state.category.push(action.payload)
        },
        authorAdded: (state, action) => {
            state.author.push(action.payload)
        },
        setTags: (state, action) => {
            const { category, author } = action.payload

            state.category = category || state.category
            state.author = author || state.author

            return state
        },
    },
})

export default tagsSlice.reducer

export const { categoryAdded, authorAdded, setTags } = tagsSlice.actions

// Author selectors
export const selectAllAuthors = (state) => state.tags.author

export const selectAuthorByValue = (state, value) =>
    state.tags.author.find((item) => item.value === value)

// Category selectors
export const selectAllCategories = (state) => state.tags.category

export const selectCategoryByValue = (state, value) =>
    state.tags.category.find((item) => item.value === value)
