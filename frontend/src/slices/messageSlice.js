import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      const ids = state.messages.map((m) => m.id)
      console.log(action.payload)
      if (ids.includes(action.payload.id)) return

      state.messages.push(action.payload)

      const stroredMessages = JSON.parse(localStorage.getItem('messages'))
      if (!stroredMessages)
        return localStorage.setItem(
          'messages',
          JSON.stringify([action.payload])
        )
      localStorage.setItem(
        'messages',
        JSON.stringify(stroredMessages.concat([action.payload]))
      )
    },
    setMessages(state, action) {
      state.messages = action.payload
    },
  },
})

export const { addMessage, setMessages } = messageSlice.actions
export const selectMessage = (state) => state.message

export default messageSlice.reducer
