import React from 'react';
import styles from '../styles/components/OrderDeviceItem.module.scss';

const OrderDeviceItem = ({device,quantity ,i}) => {

  return (
  <div className={styles.orderDevice}>
    <div>{i}</div>
    <div>{device.brand.name}</div>
    <div>{device.name}</div>
    <div style={device.discount !== 0 ? { textDecoration: 'line-through' }:{textDecoration: 'none'}}>{device.price} грн</div>
    <div>{Math.floor(device.price * (100 - device.discount) / 100)} грн</div>
    <div>{quantity} шт</div>
    <div>{Math.floor(device.price * (100 - device.discount) / 100) * quantity} грн</div>
  </div>
  );
};
export default OrderDeviceItem;