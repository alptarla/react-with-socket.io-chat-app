const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: { origin: '*' },
})

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    socket.join(user.room.name)

    socket.broadcast
      .to(user.room.name)
      .emit('infoMessage', `${user.username} has joined the chat.`)

    socket.on('sendMessage', (message) => {
      io.to(user.room.name).emit('message', message)
    })

    socket.on('disconnecting', () => {
      io.to(user.room.name).emit(
        'infoMessage',
        `${user.username} has left the chat.`
      )
    })
  })
})

app.get('/api', (req, res, next) => {
  res.send('React Chat API')
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`App running on port ${PORT}`))
