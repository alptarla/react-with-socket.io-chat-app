import { useContext } from 'react'
import { AuthContext } from '../context/userContext'

export default function useUser() {
  return useContext(AuthContext)
}
