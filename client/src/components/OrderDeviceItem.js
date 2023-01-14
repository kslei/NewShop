import React from 'react';
import styles from '../styles/components/OrderDeviceItem.module.scss';

const OrderDeviceItem = ({device, i}) => {

  return (
  <div className={styles.orderDevice}>
    <div>{i}</div>
    <div>{device.brand.name}</div>
    <div>{device.name}</div>
    <div>{device.price} грн</div>
  </div>
  );
};
export default OrderDeviceItem;