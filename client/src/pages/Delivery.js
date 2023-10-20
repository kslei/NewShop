import React, { useEffect, useState } from 'react';
import { fetchDelivery } from '../http/deliveryAPI';
import {useTranslation} from 'react-i18next';
import styles from '../styles/pages/Delivery.module.scss';

const Delivery = () => {
  const[delivery, setDelivery] = useState([]);
  const {t, i18n} = useTranslation()
  const lng = i18n.language
    
  useEffect(()=>{
    fetchDelivery(lng).then(data => setDelivery(data))
  }, [i18n.language])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.message}>{t("Demo")}</div>
        <div className={styles.delivery__title}>{t("Delivery")} {t("of goods")}</div>
        <div className={styles.delivery__content}>{t("Content_delivery")}</div>
        {delivery.map((item, i) => 
          <div className={styles.delivery__content__item} key={item.id}>{i+1}. {item.name}</div>
        )}
        <div className={styles.delivery__title}>{t("Payment")} {t("of goods")}</div>
        <div className={styles.delivery__content}>{t("Content_payment")}</div>
      </div>
    </div>
  );
};
export default Delivery;