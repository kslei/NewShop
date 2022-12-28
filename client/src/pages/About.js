import React from 'react';
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
         
    </div>
  </div>
  );
};
export default About;