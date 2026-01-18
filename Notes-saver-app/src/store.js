import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pastesSlice'


export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})