import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import MyMenu from '../forms/MyMenu';
import { fetchBasket } from '../http/orderAPI';
import { Context } from '../index';
import styles from '../styles/pages/Order.module.scss';

const Order = observer(() => {
  const [status, SetStatus] = useState('В обработке')
  const [message, setMessage] = useState('');
  const userId = null;
  const {order} = useContext(Context)
  const statusMenu = [
    { id: 1, name: "В обработке", value: "В обработке" },
    { id: 2, name: "Выполнен", value: "Выполнен" },
    { id: 3, name: "Отклонен", value: "Отклонен" },
  ]

  const onStatus = (item) => {
    SetStatus(item.value)
  }

  useEffect(()=>{
    fetchBasket(userId, status).then(data=>{
      if (Array.isArray(data)) {
        order.setOrders(data)
        setMessage('')
      } else {
        order.setOrders([]);
        setMessage(data.data.message);
      }
      })
  }, [status])
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <span className={styles.title}>Показать заказы:</span>
          <div className={styles.menu__btn}>
            <MyMenu name={'Статус'} menu={statusMenu} click={onStatus} />
          </div>
          <div className={styles.menu__error}>{message}</div>
        </div>
        {order.length!==0 &&
          <div className={styles.cards}>
            {order.orders.map(item => 
              <OrderCard key={item.id} order={item} message={setMessage}/>
            )}  
          </div>
        }
      </div>
    </div>
  );
});
export default Order;