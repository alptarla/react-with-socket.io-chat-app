import io from 'socket.io-client'

const socketService = {
  socket: null,
  socketConnection() {
    if (this.socket) return
    this.socket = io('http://localhost:5000')
  },
  joinRoom(username, room) {
    this.socket.emit('join', { username, room })
  },
  leaveRoom() {
    this.socket.disconnect()
  },
  sendMessage(message) {
    this.socket.emit('sendMessage', message)
  },
}

export default socketService
