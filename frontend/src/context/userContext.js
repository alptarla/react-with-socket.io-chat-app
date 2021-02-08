import { createContext, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const JOIN_ROOM = 'JOIN_ROOM'
const LEAVE_ROOM = 'LEAVE_ROOM'

const initialState = {
  username: '',
  roomName: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        username: action.payload.username,
        roomName: action.payload.roomName,
      }
    case LEAVE_ROOM:
      return {
        ...state,
        username: '',
        roomName: '',
      }
    default:
      return state
  }
}

export const userContext = createContext()

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { setValue, removeValue } = useLocalStorage()

  const joinUser = ({ username, roomName }) => {
    setValue({ key: 'user', value: { username, roomName } })
    dispatch({ type: JOIN_ROOM, payload: { username, roomName } })
  }
  const leaveRoom = () => {
    dispatch({ type: LEAVE_ROOM })
    removeValue('user')
  }

  return (
    <userContext.Provider value={{ joinUser, leaveRoom, ...state }}>
      {children}
    </userContext.Provider>
  )
}
