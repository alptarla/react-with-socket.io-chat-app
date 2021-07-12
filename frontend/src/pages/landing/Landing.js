import styles from './Landing.module.css'
import { useState } from 'react'
import RoomCard from '../../components/roomCard/RoomCard'
import { useHistory } from 'react-router-dom'
import rooms from '../../data/rooms'
import { useDispatch } from 'react-redux'
import { joinRoom } from '../../slices/roomSlice'

export default function Landing() {
  const [username, setUsername] = useState('')
  const [activeRoom, setActiveRoom] = useState(rooms[0])

  const dispatch = useDispatch()
  const history = useHistory()

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleRoomNameClick = (e) => {
    const activeRoom = rooms.find((room) => room.name === e.target.name)
    setActiveRoom(activeRoom)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(joinRoom({ username, room: activeRoom }))

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
