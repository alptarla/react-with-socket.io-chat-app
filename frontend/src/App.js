import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Chat from './pages/chat/Chat'
import Landing from './pages/landing/Landing'
import socketService from './services/socketService'
import { setMessages } from './slices/messageSlice'
import { joinRoom } from './slices/roomSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    socketService.socketConnection()

    const messages = localStorage.getItem('messages')
    const room = localStorage.getItem('room')

    if (messages) dispatch(setMessages(JSON.parse(messages)))
    if (room) dispatch(joinRoom(JSON.parse(room)))

    return () => socketService.socket.disconnect()
  }, [])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </div>
  )
}

export default App
