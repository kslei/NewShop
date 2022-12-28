import React, { useState, useEffect } from 'react';
import { shedule, phone, about } from '../utils/info';
import FutorInfo from './FutorInfo';
import styles from '../styles/components/Futor.module.scss';

const Futor = () => {
  
  return (
  <div className={styles.futor}>
    <div className={styles.wrapper}>
      <FutorInfo info={shedule} title='График работы'/>
      <FutorInfo info={phone} title='Контакты'/>
      <FutorInfo info={about} title='Наш адрес'/>
    </div>
  </div>
  );
};
export default Futor;