import styles from './Chat.module.css'
import chevronLeftIcon from '../../assets/chevron-left.svg'
import moreIcon from '../../assets/more-vertical.svg'
import profileImage from '../../assets/profile.png'
import plusIcon from '../../assets/plus.svg'
import sendIcon from '../../assets/send.svg'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Message from '../../components/message/Message'
import useUser from '../../hooks/useUser'
import useMessage from '../../hooks/useMessage'

export default function Chat() {
  const [message, setMessage] = useState('')

  const history = useHistory()
  const { username, roomName, leaveRoom } = useUser()
  const { sendMessage } = useMessage()

  const handleMessageChange = (e) => setMessage(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage({ username, roomName, message })
  }

  const handleLeaveRoom = () => {
    leaveRoom()
    history.push('/')
  }

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
            src={profileImage}
            alt='profile'
            className={styles.profileImage}
          />
          <strong className={styles.username}>{roomName}</strong>
          <span className={styles.roomName}>{username}</span>
        </div>
        <button className={`${styles.moreBtn} ${styles.btn}`}>
          <img src={moreIcon} alt='more icon' />
        </button>
      </div>

      <div className={styles.messageList}>
        <Message
          message='Have you heard of free beauty samples before? If you have, have you been requesting them whenever you come across free sample offers?'
          isPrimary={false}
          profileImage={profileImage}
        />
        <Message
          message='They leave the skin soft, supple and glowing – in short, beautiful. '
          isPrimary={true}
          profileImage={profileImage}
        />
        <Message
          message='They leave the skin soft, supple and glowing – in short, beautiful. '
          isPrimary={true}
          profileImage={profileImage}
        />
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
