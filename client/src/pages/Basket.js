import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../http/orderAPI';
import { HOME_ROUTE } from '../utils/consts';
import { EMAIL } from '../utils/consts';
import { Context } from '..';
import MyButton from '../forms/MyButton';
import { observer } from 'mobx-react-lite';
import BasketItem from '../components/BasketItem';
import { fetchDelivery } from '../http/deliveryAPI';
import { createMail } from '../http/orderAPI';
import MyMenu from '../forms/MyMenu';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/Basket.module.scss';


const Basket = observer(({setErrorMessage}) => {
  const [basketDevice, setBasketDevice] = useState([]);
  const [message, setMessage] = useState('');
  const [note, setNote] = useState('');
  const { user } = useContext(Context);
  const userId = user.id;
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryId, setDeliveryId] = useState(0);
  const {t, i18n} = useTranslation()
  
  useEffect(() => {
    if (localStorage.getItem('basketDevices')){
      setBasketDevice(JSON.parse(localStorage.getItem('basketDevices')))
    }
    //set Message
    if (basketDevice.length !==0) {
      setMessage('')
    } else {
      setMessage(`${t("No items in cart")}`)
    }
    fetchDelivery(i18n.language).then(data => setDeliveries(data))
  }, [userId, i18n.language])
  
  //delete device
  function deleteDevice(id) {
    localStorage.setItem('basketDevices', JSON.stringify(basketDevice.filter(d => d.id !== id)))
    if (basketDevice !== JSON.parse(localStorage.getItem('basketDevices'))) {
      setBasketDevice(JSON.parse(localStorage.getItem('basketDevices')))
      onNote(`${t("Removed")}`);
    }
  }

  //delete all devices
  function deleteAllDevice() {
    localStorage.setItem('basketDevices', JSON.stringify([]))
    if (basketDevice !== JSON.parse(localStorage.getItem('basketDevices'))) {
      setBasketDevice(JSON.parse(localStorage.getItem('basketDevices')))
      onNote(`${t("Removed")}`);
    }
  }

  //set note
  const onNote = (text) => {
    setNote(text.toUpperCase());
    setTimeout(() => {
      setNote('')
    }, 2000);
  }
  
  //set delivery
  const onDelivery = (delivery) => {
    setDeliveryId(delivery.id)
    onNote(delivery.name)
  }

  //set sum of device price with discount
  const summ = function (devices) {
    let sum = 0;
    for (let i = 0; i < devices.length; i++) {
      sum = sum + Math.floor(devices[i].price*(100 - devices[i].discount)/100)*devices[i].quantity;
    }
    return sum;
  }

  //create order
  function buy(userId, deliveryId) {
    let date = Date()
    if(!Number.isInteger(userId)) { //non - autorized ? then "note"
      onNote(`${t("Login")} ${t("or")} ${t("Sign_up")}`)
      return
    }
    if(deliveryId !== 0) {
      createOrder(basketDevice.map(device => device.id), basketDevice.map(device => device.quantity), userId, date, deliveryId).then(data =>
      {
        localStorage.setItem('basketDevices', JSON.stringify([]));
        setMail(user.name, user.email, new Date());
        navigate(HOME_ROUTE)
      }).catch(e => setErrorMessage(e)) 
    } else {
      onNote(`${t("Select")} ${t("delivery method")}`)
    }
  }

  const setMail = (name, email, date) => {
    let text = "Клиент " + name + " (" + email + ") " + date + "  сделал заказ";
    createMail(EMAIL, text)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {basketDevice.length === 0 
        ? <div className={styles.basket__error}>
            <span className={styles.basket__error_message}>{message}</span>
            <MyButton name={t("shopping_other")} onClick={()=>navigate(HOME_ROUTE)} />
          </div>
        : <div className={styles.basket__devices}>
            <div className={styles.basket__item}>
              <div>№</div>
              <div>{t("Brand")}</div>
              <div>{t("Product_name")}</div>
              <div>{t("Price")}</div>
              <div>{t("Quantity")}</div>
              <div>{t("Cost")}</div>
              <div></div>
            </div>
            {basketDevice.map((item, i) =>
              <BasketItem key={i} id={i} number={i + 1} device={item} brandname={item.brand.name} del={deleteDevice} />
            )}
            <div className={styles.basket__item_all}>
              <div>{t("Total")}:</div>
              <div>{t("price", {val: summ(basketDevice)})}</div>
              <MyButton name={t("Empty")} danger={true} onClick={deleteAllDevice} />
            </div>
            <div className={styles.basket__item_btn}>
              <div>
                <MyButton name={t("Continue") + " " + (t("shopping"))} onClick={() => navigate(HOME_ROUTE)} />
              </div>
              <div>
                <MyMenu name={t("Select") + " " + t("delivery method")} menu={deliveries} click={onDelivery}/>
              </div>
              <div className={styles.basket__item_note}>{note}</div>
              <MyButton name={t("Buy")} onClick={() => buy(userId, deliveryId)} />
            </div>
          </div>
        }
      </div>
    </div>
  );
});
export default Basket;