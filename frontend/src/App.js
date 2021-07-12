import './App.css'
import Header from './components/header/Header'
import Chat from './pages/chat/Chat'
import Landing from './pages/landing/Landing'
import { Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import socketService from './services/socketService'

function App() {
  useEffect(() => {
    socketService.socketConnection()

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
