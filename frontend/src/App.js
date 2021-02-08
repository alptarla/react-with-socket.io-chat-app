import './App.css'
import Header from './components/header/Header'
import Chat from './views/chat/Chat'
import Landing from './views/landing/Landing'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import useUser from './hooks/useUser'
import useMessage from './hooks/useMessage'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const { joinUser } = useUser()
  const { setAllMessages } = useMessage()
  const { getValue } = useLocalStorage()
  const history = useHistory()

  const user = getValue('user')
  useEffect(() => {
    if (user) {
      joinUser(user)
      if (getValue('messages')) setAllMessages(getValue('messages'))
      return history.push('/chat')
    }
    history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
