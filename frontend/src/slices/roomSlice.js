import { createSlice } from '@reduxjs/toolkit'
import socketService from '../services/socketService'

const roomSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    room: {},
    isLoggedIn: false,
    infoMessage: null,
  },
  reducers: {
    joinRoom(state, action) {
      const { username, room } = action.payload

      state.isLoggedIn = true
      state.username = username
      state.room = room

      localStorage.setItem('room', JSON.stringify({ username, room }))

      socketService.joinRoom(username, room)
    },
    leaveRoom(state) {
      state.isLoggedIn = false
      state.room = null
      state.username = null
      state.infoMessage = null

      localStorage.removeItem('room')
      localStorage.removeItem('messages')

      socketService.leaveRoom()
    },
    setInfoMessage(state, action) {
      state.infoMessage = action.payload
    },
  },
})

export const { joinRoom, leaveRoom, setInfoMessage } = roomSlice.actions
export const selectRoom = (state) => state.room

export default roomSlice.reducer
