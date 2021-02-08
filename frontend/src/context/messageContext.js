import { createContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useSocket from '../hooks/useSocket'
import { v4 as uuid } from 'uuid'

const SET_MESSAGE = 'SET_MESSAGE'
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES'
const REMOVE_MESSAGES = 'REMOVE_MESSAGES'

const initialState = {
  messages: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case SET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    case REMOVE_MESSAGES:
      return {
        ...state,
        messages: [],
      }
    default:
      return state
  }
}

export const MessageContext = createContext()

export default function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { setValue } = useLocalStorage()

  const socket = useSocket()

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch({ type: SET_MESSAGE, payload: message })
    })
    return () => socket.disconnect()
  }, [socket])

  useEffect(() => {
    setValue({ key: 'messages', value: state.messages })
  }, [setValue, state.messages])

  const sendMessage = (message) => {
    message.id = uuid()
    socket.emit('sendMessage', message)
  }

  const setAllMessages = (messages) => {
    dispatch({ type: SET_ALL_MESSAGES, payload: messages })
  }

  const removeMessages = () => dispatch({ type: REMOVE_MESSAGES })

  return (
    <MessageContext.Provider
      value={{ sendMessage, setAllMessages, removeMessages, ...state }}
    >
      {children}
    </MessageContext.Provider>
  )
}
