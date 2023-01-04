import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBasket, removeBasket, putBasket } from '../http/orderAPI';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '..';
import MyButton from '../forms/MyButton';
import { observer } from 'mobx-react-lite';
import BasketItem from '../components/BasketItem';
import { summ } from '../utils/width';
import { fetchDelivery } from '../http/deliveryAPI';
import MyMenu from '../forms/MyMenu';
import styles from '../styles/pages/Basket.module.scss';


const Basket = observer(() => {
  const [basketDevice, setBasketDevice] = useState([]);
  const [basketId, setBasketId] = useState({});
  const [message, setMessage] = useState('');
  const [note, setNote] = useState('');
  const { user } = useContext(Context);
  const { order } = useContext(Context)
  const userId = user.id;
  const navigate = useNavigate();
  const status = 'NEW';
  
  useEffect(() => {
    fetchBasket(userId, status).then((data) => {
      if (Array.isArray(data)) {
        setBasketDevice(data[0].order_devices)
        setBasketId(data[0].id)
        setMessage('')
      } else {
        setBasketDevice([])
        setMessage(data.data.message)
      }
    })
    fetchDelivery().then(data => order.setDeliveries(data))
  }, [userId, order])  

  function deleteDevice(deviceId, id) {
    removeBasketDevice(id)
    removeBasket(userId, deviceId).then(() => {
      onNote('УДАЛЕНО');
    })
  }

  const onNote = (text) => {
    setNote(text.toUpperCase());
    setTimeout(() => {
      setNote('')
    }, 2000);
  }

  const removeBasketDevice = (id) => {
    setBasketDevice(basketDevice.filter(d => d.id !== id))
  }

  function deleteAllDevice() {
    for (let i = 0; i < basketDevice.length; i++) {
      removeBasket(userId, basketDevice[i].device.id).then(() => navigate(SHOP_ROUTE))
    }
  }

  const onDelivery = (delivery) => {
    console.log(delivery.name)
    order.setSelectedDelivery(delivery)
    onNote(delivery.name)
  }

  function buy(id, deliveryId) {
    let status = 'В обработке';
    let date = Date()
    if(deliveryId) {
      putBasket(id, status, date, deliveryId).then(() => navigate(SHOP_ROUTE))
    } else {
      onNote('Выберите способ доставки')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {basketDevice.length === 0 
        ? <div className={styles.basket__error}>
            <span className={styles.basket__error_message}>{message}</span>
            <MyButton name={'За покупками'} onClick={()=>navigate(SHOP_ROUTE)} />
          </div>
        : <div className={styles.basket__devices}>
            <div className={styles.basket__item}>
              <div>№</div>
              <div>Бренд</div>
              <div>Наименование</div>
              <div>шт</div>
              <div>Цена</div>
              <div></div>
            </div>
            {basketDevice.map((item, i) =>
              <BasketItem key={item.id} id={item.id} number={i + 1} device={item.device} brandname={item.device.brand.name} del={deleteDevice} />
            )}
            <div className={styles.basket__item_all}>
              <div>Всего:</div>
              <div>{summ(basketDevice)} грн</div>
              <MyButton name={'Очистить'} danger={true} onClick={deleteAllDevice} />
            </div>
            <div className={styles.basket__item_btn}>
              <div>
                <MyButton name={'Продолжить покупки'} onClick={() => navigate(SHOP_ROUTE)} />
              </div>
              <div>
                <MyMenu name={"Выберите способ доставки"} menu={order.deliveries} click={onDelivery}/>
              </div>
              <div className={styles.basket__item_note}>{note}</div>
              <MyButton name={'Купить'} onClick={() => buy(basketId, order.selectedDelivery.id)} />
            </div>
          </div>
        }
      </div>
    </div>
  );
});
export default Basket;