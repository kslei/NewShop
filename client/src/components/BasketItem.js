import React from 'react';
import MyButton from '../forms/MyButton';
import styles from '../styles/pages/Basket.module.scss';

const BasketItem = ({ id, number, device, brandname, del, display }) => {
  
  return (
    <div className={styles.basket__item}>
      <div>{number}</div>
      <div>{brandname}</div>
      <div>{device.name}</div>
      <div>шт</div>
      <div>{device.price} грн</div>
      <div><MyButton name={'Удалить'} danger={true} onClick={() => del(device.id, id)} /></div>
      <div></div>
    </div>
  );
};
export default BasketItem;