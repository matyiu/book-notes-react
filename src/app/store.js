import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../redux/authSlice'
import notesReducer from '../redux/notesSlice'
import tagsReducer from '../redux/tagsSlice'

export default configureStore({
    reducer: {
        notes: notesReducer,
        tags: tagsReducer,
        auth: authSlice,
    },
})
