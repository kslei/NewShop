import React from 'react';
import Slider from '../components/Slider';
import { shedule, phone, about } from '../utils/info';
import Map from '../components/Map';
import styles from '../styles/pages/About.module.scss';

const About = () => {
  
  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.about__title}>О магазине</div>
      <div className={styles.about__content}>Магазин работает в демо версии. Адрес и телефоны магазина
      условные. Все товары представлены на страницах для ознакомления с работой магазина.
      При потверждении/отклонении продавцом заказа на почту покупателя, указанную при регистрации,
      отправляется письмо с уведомлением о статусе заказа. Сервисы оплаты и пересылки отсутствуют.
      Телефонные номера магазина и покупателя являются ссылкой</div>
      <div className={styles.about__row}>
        <div className={styles.about__map}>
          <Map />
        </div>
        <div className={styles.about__data}>
          <div className={styles.about__data__title}>Наши контакты</div>
            {phone.map(data =>
              <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
            )}
          <div className={styles.about__data__title}>Наш адрес</div>
            {about.map(data =>
              <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
          )}
          <div className={styles.about__data__title}>График работы</div>
          {shedule.map(data => 
            <div className={styles.about__data__descriptions} key={data.id}>{data.info}</div>
          )}
        </div>
      </div>
      
      
    </div>
  </div>
  );
};
export default About;