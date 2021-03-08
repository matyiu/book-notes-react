import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../redux/notesSlice';
import tagsReducer from '../redux/tagsSlice';

export default configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer
  },
});
