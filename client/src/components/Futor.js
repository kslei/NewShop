import React from 'react';
import { scheduleRU, scheduleUA, scheduleEN, phone, aboutRU, aboutUA, aboutEN } from '../utils/info';
import FutorInfo from './FutorInfo';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/Futor.module.scss';

const Futor = () => {
  //multilanguage
  const { t, i18n } = useTranslation()
  
  let schedule;
  let about;

  switch (i18n.language) {
    case "ru": 
      schedule = scheduleRU
      about = aboutRU
      break
    case "uk": 
      schedule = scheduleUA
      about = aboutUA
      break
    case "en":
      schedule = scheduleEN
      about = aboutEN
      break
    default:
      schedule = scheduleEN
      about = aboutEN
  }


  return (
  <div className={styles.futor}>
    <div className={styles.wrapper}>
      <FutorInfo info={schedule} title={t("Schedule")}/>
      <FutorInfo info={phone} title={t("Our_contacts")} />
      <FutorInfo info={about} title={t("Our_address")}/>
    </div>
  </div>
  );
};
export default Futor;