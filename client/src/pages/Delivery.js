import React, { useEffect, useState } from 'react';
import { fetchDelivery } from '../http/deliveryAPI';
import styles from '../styles/pages/Delivery.module.scss';

const Delivery = () => {
  const[delivery, setDelivery] = useState([]);
  
  useEffect(()=>{
    fetchDelivery().then(data => setDelivery(data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.message}>Это демо версия</div>
        <div className={styles.delivery__title}>Доставка товара</div>
        <div className={styles.delivery__content}>Магазин осуществляет доставку товара следущими способами:</div>
        {delivery.map((item, i) => 
          <div className={styles.delivery__content__item} key={item.id}>{i+1}.{item.name}</div>
        )}
        <div className={styles.delivery__title}>Оплата товара</div>
        <div className={styles.delivery__content}>Оплата товара производится при получении товара у курьера или в транспортной компании. При самовывозе товара из магазина оплата производится в магазине</div>
      </div>
    </div>
  );
};
export default Delivery;