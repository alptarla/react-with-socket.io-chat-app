import { useContext } from 'react'
import { userContext } from '../context/userContext'

export default function useUser() {
  return useContext(userContext)
}
