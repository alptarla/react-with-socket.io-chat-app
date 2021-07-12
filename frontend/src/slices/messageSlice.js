import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
  },
})

export const { addMessage } = messageSlice.actions
export const selectMessage = (state) => state.message

export default messageSlice.reducer
