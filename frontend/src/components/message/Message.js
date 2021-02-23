import styles from './Message.module.css'

export default function Message({
  profileImage,
  message,
  username,
  isPrimary,
  createdAt,
}) {
  return (
    <div
      className={`${styles.message} ${
        isPrimary ? styles.primaryMessage : styles.secondaryMessage
      }`}
    >
      {!isPrimary ? (
        <div className={styles.messageProfile}>
          <img src={profileImage} alt='profile' /> <small>{username}</small>
        </div>
      ) : null}
      <div>
        <p className={styles.messageContent}>{message}</p>
        <small className={styles.date}>{createdAt}</small>
      </div>
    </div>
  )
}
