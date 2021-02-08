import styles from './RoomCard.module.css'

export default function RoomCard({ room, handleRoomNameClick, isActive }) {
  return (
    <button
      className={`${styles.roomBtn} ${isActive ? styles.active : null}`}
      name={room.name}
      onClick={handleRoomNameClick}
      type='button'
    >
      {room.name}
    </button>
  )
}
