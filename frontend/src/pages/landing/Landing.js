import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import RoomCard from '../../components/roomCard/RoomCard'
import rooms from '../../data/rooms'
import { joinRoom, selectRoom } from '../../slices/roomSlice'
import styles from './Landing.module.css'

export default function Landing() {
  const [username, setUsername] = useState('')
  const [activeRoom, setActiveRoom] = useState(rooms[0])

  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoggedIn } = useSelector(selectRoom)

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleRoomClick = (roomName) => {
    const activeRoom = rooms.find((room) => room.name === roomName)
    setActiveRoom(activeRoom)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(joinRoom({ username, room: activeRoom }))

    history.push('/chat')
  }

  if (isLoggedIn) return <Redirect to='/chat' />

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
              roomName={room.name}
              handleRoomClick={handleRoomClick}
              isActive={room.name === activeRoom?.name}
              room={activeRoom}
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
