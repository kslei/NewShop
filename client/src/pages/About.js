import React from 'react';
import { scheduleRU, scheduleUA, scheduleEN, phone, aboutRU, aboutUA, aboutEN } from '../utils/info';
import Map from '../components/Map';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/About.module.scss';

const About = () => {
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
  <div className={styles.container}>
    <div className={styles.wrapper}>
       <div className={styles.about__title}>{t("About_Store")}</div>
      <div className={styles.about__content}>{t("Content_about")}</div>
      <div className={styles.about__row}>
        <div className={styles.about__map}>
          <Map />
        </div>
        <div className={styles.about__data}>
          <div className={styles.about__data__title}>{t("Our_contacts")}</div>
            {phone.map(data =>
              <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
            )}
          <div className={styles.about__data__title}>{t("Our_address")}</div>
            {about.map(data =>
              <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
          )}
          <div className={styles.about__data__title}>{t("Schedule")}</div>
          {schedule.map(data => 
            <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
export default About;