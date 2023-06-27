import React from 'react';
import styles from '../styles/components/AdminDelivery.module.scss';
import MyButton from '../forms/MyButton';

const AdminDelivery = ({delivery, remove}) => {
  
  return (
    <div className={styles.adminDelivery}>
      <div className={styles.deliveryId}>{delivery.id}</div>
      <div className={styles.deliveryId}>{delivery.name}</div>
      <MyButton danger={true} sm='true' name='Удалить доставку' onClick={() => remove(delivery.id)} />
    </div>
  );
};
export default AdminDelivery;