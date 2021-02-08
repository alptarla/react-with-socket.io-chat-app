import { useContext } from 'react'
import { MessageContext } from '../context/messageContext'

export default function useUser() {
  return useContext(MessageContext)
}
