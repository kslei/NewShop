import React from 'react';
import MyButton from '../forms/MyButton';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/Basket.module.scss';

const BasketItem = ({ id, number, device, brandname, del}) => {
  const {t} = useTranslation()
  
  return (
    <div className={styles.basket__item}>
      <div>{number}</div>
      <div>{brandname}</div>
      <div>{device.name}</div>
      <div>{t("price", { val: Math.floor(device.price * (100 - device.discount) / 100) })}</div>
      <div>{device.quantity} {t("pcs")}</div>
      <div>{t("price", { val: Math.floor(device.price * (100 - device.discount) / 100) * device.quantity})}</div>
      <div><MyButton name={t("Remove")} danger={true} onClick={() => del(device.id)} /></div>
      <div></div>
    </div>
  );
};
export default BasketItem;