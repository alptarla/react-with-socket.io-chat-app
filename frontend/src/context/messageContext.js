import { createContext, useReducer } from 'react'

const SET_MESSAGE = 'SET_MESSAGE'

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
    default:
      return state
  }
}

export const MessageContext = createContext()

export default function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  //   const { setValue, removeValue } = useLocalStorage()

  const sendMessage = (message) => {
    // setValue({ key: 'user', value: { username, roomName } })
    dispatch({ type: SET_MESSAGE, payload: message })
  }

  return (
    <MessageContext.Provider value={{ sendMessage, ...state }}>
      {children}
    </MessageContext.Provider>
  )
}
