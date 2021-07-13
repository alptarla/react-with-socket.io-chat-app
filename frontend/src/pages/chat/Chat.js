import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import defaultUserProfile from '../../assets/defaultUserProfile.png'
import Message from '../../components/message/Message'
import socketService from '../../services/socketService'
import {
  addMessage,
  selectMessage,
  setMessages,
} from '../../slices/messageSlice'
import { leaveRoom, selectRoom, setInfoMessage } from '../../slices/roomSlice'
import styles from './Chat.module.css'

export default function Chat() {
  const [message, setMessage] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const socket = socketService.socket
  useEffect(() => {
    if (!socket) return

    socket.on('message', (message) => {
      dispatch(addMessage(message))
    })

    socket.on('infoMessage', (message) => {
      dispatch(setInfoMessage(message))
    })

    return () => socket.disconnect()
  }, [dispatch, socket])

  const { username, room, isLoggedIn, infoMessage } = useSelector(selectRoom)
  const { messages } = useSelector(selectMessage)

  const messageListRef = useRef(null)
  useEffect(() => {
    if (!messageListRef.current) return
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight
  }, [messages])

  const handleMessageChange = (e) => setMessage(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    socketService.sendMessage({
      username,
      room,
      message,
      createdAt: new Date(),
      id: uuid(),
    })

    setMessage('')
  }

  const handleLeaveRoom = () => {
    dispatch(leaveRoom())
    dispatch(setMessages([]))
    history.push('/')
  }

  if (!isLoggedIn) return <Redirect to='/' />

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <i
          className='fas fa-chevron-left fa-2x icon-btn'
          onClick={handleLeaveRoom}
        />
        <div className={styles.userInfo}>
          <img
            src={room.profileImage}
            alt={room.name}
            className={styles.profileImage}
          />
          <strong className={styles.roomName}>{room.name}</strong>
          <span className={styles.username}>{username}</span>
        </div>
        <i className='fas fa-ellipsis-v fa-2x icon-btn' />
      </div>
      <div className={styles.messageList} ref={messageListRef}>
        {infoMessage && <small>{infoMessage}</small>}
        {messages?.map((item, index) => (
          <Message
            key={index}
            message={item}
            isPrimary={username === item.username}
            profileImage={defaultUserProfile}
          />
        ))}
      </div>
      <div className={styles.chatAction}>
        <form onSubmit={handleSubmit} className={styles.messageForm}>
          <i
            className={classnames(
              'fas fa-plus-circle fa-2x icon-btn',
              styles.plusIcon
            )}
          />
          <input
            type='text'
            name='message'
            placeholder='Type your message here'
            value={message}
            onChange={handleMessageChange}
            required
          />
          <i
            className='fas fa-paper-plane icon-btn fa-2x'
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  )
}
