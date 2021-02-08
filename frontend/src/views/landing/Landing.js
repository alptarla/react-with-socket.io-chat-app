import styles from './Landing.module.css'
import { useState } from 'react'
import RoomCard from '../../components/roomCard/RoomCard'
import { useHistory } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import rooms from '../../data/rooms'

export default function Landing() {
  const [username, setUsername] = useState('')
  const [activeRoom, setActiveRoom] = useState(rooms[0])

  const history = useHistory()

  const { joinUser } = useUser()

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleRoomNameClick = (e) => {
    setActiveRoom(rooms.find((room) => room.name === e.target.name))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    joinUser({ username, room: activeRoom })
    history.push('/chat')
  }

  return (
    <div className={styles.chatFormContainer}>
      <form onSubmit={handleSubmit} className={styles.chatForm}>
        <div className={styles.usernameGroup}>
          <label htmlFor='username'>USERNAME</label>
          <input
            type='text'
            name='username'
            className={styles.usernameInput}
            placeholder='Enter your username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles.roomGroup}>
          <h4 className={styles.roomGroupTitle}>Rooms</h4>
          {rooms.map((room, index) => (
            <RoomCard
              key={index}
              room={room}
              handleRoomNameClick={handleRoomNameClick}
              isActive={room.name === activeRoom.name}
            />
          ))}
        </div>
        <button type='submit' className={styles.submitBtn}>
          Join Room
        </button>
      </form>
    </div>
  )
}
