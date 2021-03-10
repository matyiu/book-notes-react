import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadData } from "../app/localStorage";

const initialState = loadData('boonote.tags') || {author: [], category: []}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        categoryAdded: {
            reducer(state, action) {
                state.category.push(action.payload);
            },
            prepare(content) {
                return {
                    payload: {
                        value: nanoid(),
                        content
                    }
                };
            }
        },
        authorAdded: {
            reducer(state, action) {
                state.author.push(action.payload);
            },
            prepare(content) {
                return {
                    payload: {
                        value: nanoid(),
                        content
                    }
                };
            }
        }
    }
});


export default tagsSlice.reducer;

export const { 
    categoryAdded, 
    authorAdded
} = tagsSlice.actions;


// Author selectors
export const selectAllAuthors = (state) => state.tags.author;

export const selectAuthorByValue = (state, value) => 
    state.tags.author.find(item => item.value === value);

// Category selectors
export const selectAllCategories = (state) => state.tags.category;

export const selectCategoryByValue = (state, value) => 
    state.tags.category.find(item => item.value === value);