import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/OrderDeviceItem.module.scss';

const OrderDeviceItem = ({device,quantity ,i}) => {
  const {t} = useTranslation()
  return (
  <div className={styles.orderDevice}>
    <div>{i}</div>
    <div>{device.brand.name}</div>
    <div>{device.name}</div>
    <div style={device.discount !== 0 ? { textDecoration: 'line-through' }:{textDecoration: 'none'}}>{t("price", {val: device.price})}</div>
    <div>{t("price", {val: Math.floor(device.price * (100 - device.discount) / 100)})}</div>
    <div>{quantity} {t("pcs")}</div>
    <div>{t("price", {val: Math.floor(device.price * (100 - device.discount) / 100) * quantity})}</div>
  </div>
  );
};
export default OrderDeviceItem;