import React from 'react';
import MyButton from '../forms/MyButton';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/AdminDelivery.module.scss';

const AdminDelivery = ({delivery, remove}) => {
  const {t} = useTranslation()
  
  return (
    <div className={styles.adminDelivery}>
      <div className={styles.deliveryId}>{delivery.id}</div>
      <div className={styles.deliveryId}>{delivery.name}</div>
      <MyButton danger={true} sm='true' name={t("Remove")+" "+t("Delivery_1").toLowerCase()} onClick={() => remove(delivery.id)} />
    </div>
  );
};
export default AdminDelivery;