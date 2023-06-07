import React from 'react';
import MyButton from '../forms/MyButton';
import OrderDeviceItem from './OrderDeviceItem';
import { putBasket, createMail } from '../http/orderAPI';
import styles from '../styles/components/OrderCard.module.scss';

const OrderCard = ({order, message}) => {
  
  const setOrder = (id, status, date, deliveryId) => {
    let text = "Уважаемый "+order.user.name+"! Ваш заказ № " + id + " от " + order.date.split('.')[0].toString().split('T')[0].toString() + " " +status.toLowerCase()+". На это сообщение отвечать не нужно. Если у Вас есть вопросы, перезвоните по одному из телефонов, указанных на странице сайта";
    putBasket(id, status, date, deliveryId).then((data) => { 
      if (Array.isArray(data)) {
        message(status); createMail(order.user.email, text)
      } else {
        message(data.data.message);
      }
    })
  }

  const summ = function (devices) {
    let sum = 0;
    for (let i = 0; i < devices.length; i++) {
      sum = sum + Math.floor(devices[i].device.price * (100 - devices[i].device.discount) / 100) * devices[i].quantity;
    }
    return sum;
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
    <div className={styles.card__item}>
      <div>№</div>
      <div>Бренд</div>
      <div>Наименование</div>
      <div>Цена</div>
      <div>со скидкой</div>
      <div>Кол-во</div>
      <div>Стоимость</div>
    </div>
    {order.order_devices.map((device, i) =>
      <OrderDeviceItem key={device.id} device={device.device} quantity={device.quantity} i={i+1}/>
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