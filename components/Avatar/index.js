import useUser from "hooks/useUser";

import styles from 'styles/avatar.module.css'

const Avatar = () => {
  const user = useUser();

  return (
    user 
    ? <div className={styles.container}>
      <img src={user.avatar} alt={user.username} />
      <div>
        <label className={styles.name}>{user.username}</label>
        <label className={styles.mail}>{user.email}</label>
      </div>
    </div>
    : null
  )
}
export default Avatar;