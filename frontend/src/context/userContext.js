import { createContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useSocket from '../hooks/useSocket'

const JOIN_ROOM = 'JOIN_ROOM'
const LEAVE_ROOM = 'LEAVE_ROOM'
const SET_INFO_MESSAGE = 'SET_INFO_MESSAGE'

const initialState = {
  username: '',
  room: {},
  infoMessage: '',
  isLoggedIn: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        username: action.payload.username,
        room: action.payload.room,
        isLoggedIn: true,
      }
    case LEAVE_ROOM:
      return {
        ...state,
        username: '',
        room: {},
        infoMessage: '',
        isLoggedIn: false,
      }
    case SET_INFO_MESSAGE:
      return {
        ...state,
        infoMessage: action.payload,
      }
    default:
      return state
  }
}

export const userContext = createContext()

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { setValue, removeValue } = useLocalStorage()

  const socket = useSocket()

  const joinUser = ({ username, room }) => {
    setValue({ key: 'user', value: { username, room } })
    dispatch({ type: JOIN_ROOM, payload: { username, room } })
    socket.open()
    socket.emit('join', { username, room })
  }
  const leaveRoom = () => {
    dispatch({ type: LEAVE_ROOM })
    removeValue('user')
    removeValue('messages')
    socket.disconnect()
  }

  useEffect(() => {
    socket.on('infoMessage', (message) => {
      dispatch({ type: SET_INFO_MESSAGE, payload: message })
    })
    return () => socket.disconnect()
  }, [socket])

  return (
    <userContext.Provider value={{ joinUser, leaveRoom, ...state }}>
      {children}
    </userContext.Provider>
  )
}
