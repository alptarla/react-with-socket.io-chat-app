import classnames from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './Message.module.css'

export default function Message({ profileImage, message, isPrimary }) {
  const formatedDate = (date) => moment(date).calendar()

  const messageClass = classnames(styles.message, {
    [styles.primaryMessage]: isPrimary,
    [styles.secondaryMessage]: !isPrimary,
  })

  return (
    <div className={messageClass}>
      {!isPrimary && (
        <div className={styles.messageProfile}>
          <img src={profileImage} alt='profile' />
          <small>{message.username}</small>
        </div>
      )}
      <div>
        <p className={styles.messageContent}>{message.message}</p>
        <small className={styles.date}>{formatedDate(message.createdAt)}</small>
      </div>
    </div>
  )
}

Message.propTypes = {
  profileImage: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  isPrimary: PropTypes.bool,
}

Message.defaultProps = {
  isPrimary: false,
}
