import styles from './Chat.module.css'
import chevronLeftIcon from '../../assets/chevron-left.svg'
import moreIcon from '../../assets/more-vertical.svg'
import defaultUserProfile from '../../assets/defaultUserProfile.png'
import plusIcon from '../../assets/plus.svg'
import sendIcon from '../../assets/send.svg'
import { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Message from '../../components/message/Message'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import socketService from '../../services/socketService'
import { addMessage, selectMessage } from '../../slices/messageSlice'
import { v4 as uuid } from 'uuid'
import { leaveRoom, selectRoom, setInfoMessage } from '../../slices/roomSlice'

export default function Chat() {
  const [message, setMessage] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const socket = socketService.socket
  useEffect(() => {
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

    // todo: remove stored messages

    history.push('/')
  }

  const formatDate = (date) => moment(date).calendar()

  if (!isLoggedIn) return <Redirect to='/' />

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button
          className={`${styles.chevronLeftBtn} ${styles.btn}`}
          onClick={handleLeaveRoom}
        >
          <img src={chevronLeftIcon} alt='chevron left icon' />
        </button>
        <div className={styles.userInfo}>
          <img
            src={room.profileImage}
            alt='profile'
            className={styles.profileImage}
          />
          <strong className={styles.roomName}>{room.name}</strong>
          <span className={styles.username}>{username}</span>
        </div>
        <button className={`${styles.moreBtn} ${styles.btn}`}>
          <img src={moreIcon} alt='more icon' />
        </button>
      </div>
      <div className={styles.messageList} ref={messageListRef}>
        {infoMessage ? <small>{infoMessage}</small> : null}
        {messages?.map((item, index) => (
          <Message
            key={index}
            message={item.message}
            username={item.username}
            isPrimary={item.username === username}
            profileImage={defaultUserProfile}
            createdAt={formatDate(item.createdAt)}
          />
        ))}
      </div>
      <div className={styles.chatAction}>
        <form onSubmit={handleSubmit} className={styles.messageForm}>
          <button className={`${styles.plusBtn} ${styles.btn}`} type='button'>
            <img src={plusIcon} alt='plus icon' />
          </button>
          <input
            type='text'
            name='message'
            placeholder='Type your message here'
            value={message}
            onChange={handleMessageChange}
            required
          />
          <button className={`${styles.sendBtn} ${styles.btn}`} type='submit'>
            <img src={sendIcon} alt='send icon' />
          </button>
        </form>
      </div>
    </div>
  )
}
