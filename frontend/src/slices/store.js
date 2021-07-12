import { configureStore } from '@reduxjs/toolkit'
import messageSlice from './messageSlice'
import roomReducer from './roomSlice'

const store = configureStore({
  reducer: {
    room: roomReducer,
    message: messageSlice,
  },
})

export default store
