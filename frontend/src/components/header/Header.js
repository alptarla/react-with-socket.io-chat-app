import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <i className='far fa-comments fa-2x' />
          <span>ChatApp</span>
        </div>
      </div>
    </div>
  )
}
