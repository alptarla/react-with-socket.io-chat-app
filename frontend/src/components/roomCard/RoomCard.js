import styles from './RoomCard.module.css'

export default function RoomCard({ roomName, handleRoomNameClick, isActive }) {
  return (
    <button
      className={`${styles.roomBtn} ${isActive ? styles.active : null}`}
      name={roomName}
      onClick={handleRoomNameClick}
      type='button'
    >
      {roomName}
    </button>
  )
}
