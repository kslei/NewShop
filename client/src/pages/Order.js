import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import MyMenu from '../forms/MyMenu';
import { fetchBasket } from '../http/orderAPI';
import { Context } from '../index';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/Order.module.scss';

const Order = observer(({setErrorMessage}) => {
  const [status, setStatus] = useState('In_processing')
  const [message, setMessage] = useState('');
  const {order} = useContext(Context)
  const {t, i18n} = useTranslation()

  const statusMenu = [
    { id: 1, name: `${t("In_processing")}`, value: "In_processing" },
    { id: 2, name: `${t("Executed")}`, value: "Executed" },
    { id: 3, name: `${t("Rejected")}`, value: "Rejected" },
  ]

  const onStatus = (item) => {
    setStatus(item.value)
  }

  
  useEffect(()=>{
    setTimeout(()=>{
      setMessage('')
    }, 2000)
  }, [message])

  useEffect(()=>{
    fetchBasket(status, i18n.language).then(data=>{
      if (Array.isArray(data)) {
        order.setOrders(data)
        setMessage('')
      } else {
        order.setOrders([]);
        setMessage(data.data.message);
      }
      })
  }, [order, status, i18n.language])
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <span className={styles.title}>{t("Show")} <span style={{textTransform: "lowercase"}}>{t("Orders")}</span>:</span>
          <div className={styles.menu__btn}>
            <MyMenu name={t("Status")} menu={statusMenu} click={onStatus} />
          </div>
        </div>
        <div className={styles.orderPanel}>
          <div className={styles.message}>{message}</div>
          {order.length!==0 &&
            <div className={styles.cards}>
              {order.orders.map(item => 
                <OrderCard key={item.id} order={item} message={setMessage} setErrorMessage={setErrorMessage}/>
              )}  
            </div>
          }
        </div>
        
      </div>
    </div>
  );
});
export default Order;