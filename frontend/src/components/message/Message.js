import styles from './Message.module.css'

export default function Message({ profileImage, message, isPrimary }) {
  return (
    <div
      className={`${styles.message} ${
        isPrimary ? styles.primaryMessage : styles.secondaryMessage
      }`}
    >
      {!isPrimary ? <img src={profileImage} alt='profile' /> : null}
      <div>
        <p className={styles.messageContent}>{message}</p>
        <small className={styles.date}>Today | 16:36</small>
      </div>
    </div>
  )
}
