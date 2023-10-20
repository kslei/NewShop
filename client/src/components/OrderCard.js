import React from 'react';
import MyButton from '../forms/MyButton';
import OrderDeviceItem from './OrderDeviceItem';
import { putBasket, createMail } from '../http/orderAPI';
import styles from '../styles/components/OrderCard.module.scss';
import { useTranslation } from 'react-i18next';

const OrderCard = ({order, message, setErrorMessage}) => {
  const {t} = useTranslation()
  //set Order
  const setOrder = (id, status, date, deliveryId) => {
    let text = "Уважаемый "+order.user.name+"! Ваш заказ № " + id + " от " + order.date.split('.')[0].toString().split('T')[0].toString() + " " +status.toLowerCase()+". На это сообщение отвечать не нужно. Если у Вас есть вопросы, перезвоните по одному из телефонов, указанных на странице сайта";
    putBasket(id, status, date, deliveryId).then((data) => { 
      if (Array.isArray(data)) {
        message(status); createMail(order.user.email, text)
      } else {
        message(data.data.message);
      }
    }).catch(e => setErrorMessage(e))
  }

  //total amount of the order including the discount
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
      <div>{t("Status")}</div>
      <div>{t("Date")}</div>
      <div>{t("Name")}</div>
      <div>email</div>
      <div>{t("Phone")}</div>
      <MyButton name={t("Confirm")} onClick={() => setOrder(order.id, 'Executed', order.date, order.deliveryId)} />
    </div>
    <div className={styles.card__content}>
      <div className={styles.b__b}>{order.id}</div>
      <div className={styles.r}>{t(order.status).toUpperCase()}</div>
      <div>{order.date.split('.')[0].toString().split('T').join(' ')}</div>
      <div>{order.user.name}</div>
      <div>{order.user.email}</div>
      <a className={styles.b} href="tel: {order.user.phone}">{order.user.phone}</a>
        <MyButton name={t("Reject")} danger={true} onClick={() => setOrder(order.id, 'Rejected', order.date, order.deliveryId)}/>  
    </div>
    <div className={styles.card__item}>
      <div>№</div>
      <div>{t("Brand")}</div>
      <div>{t("Product_name")}</div>
      <div>{t("Price")}</div>
      <div>{t("Discounted")}</div>
      <div>{t("Quantity")}</div>
      <div>{t("Cost")}</div>
    </div>
    {order.order_devices.map((device, i) =>
      <OrderDeviceItem key={device.id} device={device.device} quantity={device.quantity} i={i+1}/>
    )} 
    <div className={styles.card__futor}>
      <div>{t("Delivery")}:</div>
      <div className={styles.b__b}>{order.delivery.name}</div>
      <div>{t("Total")}:</div>
        <div className={styles.b__b}>{t("price", {val: summ(order.order_devices)})}</div>
      <div></div>
    </div>
  </div>
  );
};
export default OrderCard;