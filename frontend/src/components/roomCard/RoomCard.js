import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './RoomCard.module.css'

export default function RoomCard({ roomName, handleRoomClick, isActive }) {
  const cardClass = classnames(styles.roomBtn, { [styles.active]: isActive })

  return (
    <button
      className={cardClass}
      onClick={() => handleRoomClick(roomName)}
      type='button'
    >
      {roomName}
    </button>
  )
}

RoomCard.propTypes = {
  roomName: PropTypes.string.isRequired,
  handleRoomClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

RoomCard.defaultProps = {
  isActive: false,
}
