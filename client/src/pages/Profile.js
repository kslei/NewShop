import React, { useEffect, useState } from 'react';
import { check } from '../http/userAPI';
import styles from '../styles/pages/Profile.module.scss';

const Profile = () => {
  const [user, setUser] = useState([])
  
  useEffect(()=>{
    check().then(data=>setUser(data))
  },[])

  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.title}>Профиль</div>
      <div className={styles.user}>
        <div className={styles.user__title}>Имя: <span className={styles.user__text}>{user.name}</span></div>
        <div className={styles.user__title}>Email: <span className={styles.user__text}>{user.email}</span></div>
        <div className={styles.user__title}>Телефон: <span className={styles.user__text}>{user.phone}</span></div>
      </div>
    </div>
  </div>
  );
};
export default Profile;