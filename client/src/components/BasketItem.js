import React from 'react';
import MyButton from '../forms/MyButton';
import styles from '../styles/pages/Basket.module.scss';

const BasketItem = ({ id, number, device, brandname, del}) => {
  
  return (
    <div className={styles.basket__item}>
      <div>{number}</div>
      <div>{brandname}</div>
      <div>{device.name}</div>
      <div>{Math.floor(device.price*(100 - device.discount)/100)} грн</div>
      <div>{device.quantity} шт</div>
      <div>{Math.floor(device.price*(100 - device.discount)/100) * device.quantity} грн</div>
      <div><MyButton name={'Удалить'} danger={true} onClick={() => del(device.id)} /></div>
      <div></div>
    </div>
  );
};
export default BasketItem;