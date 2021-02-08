import io from 'socket.io-client'

let socket = null
export default function useSocket() {
  if (socket) return socket
  socket = io('http://localhost:5000')

  return socket
}
