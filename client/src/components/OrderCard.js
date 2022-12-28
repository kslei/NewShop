import React from 'react';
import MyButton from '../forms/MyButton';
import OrderDeviceItem from './OrderDeviceItem';
import { summ } from '../utils/width';
import { putBasket, createMail } from '../http/orderAPI';
import styles from '../styles/components/OrderCard.module.scss';


const OrderCard = ({order, message}) => {
  console.log(order)
  let sum = 0;
  const setOrder = (id, status, date, deliveryId) => {
    let text = "Уважаемый "+order.user.name+"! Ваш заказ № " + id + " от " + order.date.split('.')[0].toString().split('T')[0].toString() + " " +status.toLowerCase()+".";
    putBasket(id, status, date, deliveryId).then((data) => { message(status); createMail(order.user.email, text) })
  }

  return (
  <div className={styles.card}>
    <div className={styles.card__title}>
      <div>№</div>
      <div>Статус</div>
      <div>Дата</div>
      <div>Имя</div>
      <div>email</div>
      <div>Телефон</div>
        <MyButton name={'Подтвердить'} onClick={() => setOrder(order.id, 'Выполнен', order.date, order.deliveryId)} />
    </div>
    <div className={styles.card__content}>
      <div className={styles.b__b}>{order.id}</div>
      <div className={styles.r}>{order.status.toUpperCase()}</div>
      <div>{order.date.split('.')[0].toString().split('T').join(' ')}</div>
      <div>{order.user.name}</div>
      <div>{order.user.email}</div>
        <a className={styles.b} href="tel: {order.user.phone}">{order.user.phone}</a>
      <MyButton name={'Отклонить'} danger={true} onClick={()=>setOrder(order.id, 'Отклонен', order.date, order.deliveryId)}/>  
    </div>
    {order.order_devices.map((device, i) =>
      <OrderDeviceItem key={device.id} device={device.device} i={i+1}/>
    )} 
    <div className={styles.card__futor}>
      <div>Доставка:</div>
      <div className={styles.b__b}>{order.delivery.name}</div>
      <div>Всего:</div>
        <div className={styles.b__b}>{summ(order.order_devices)} грн</div>
      <div></div>
    </div>
  </div>
  );
};
export default OrderCard;