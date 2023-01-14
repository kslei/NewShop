import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../forms/Image';
import MyButton from '../forms/MyButton';
import Rating from '../components/Rating';
import { fetchOneDevice, createRating } from '../http/deviceAPI';
import { Context } from '..';
import { BASKET_ROUTE } from '../utils/consts';
import { createOrder } from '../http/orderAPI';
import styles from '../styles/pages/DevicePage.module.scss';

const DevicePage = () => {
  const {user} = useContext(Context)
  const [device, setDevice] = useState({info:[]})
  const [brand, setBrand] = useState('')
  const [rate, setRate] = useState(0);
  const [message, setMessage] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    fetchOneDevice(id).then(data=>{setDevice(data); setBrand(data.brand)})
  },[])

  const setRating = (rate, userId, deviceId) => {
    createRating(rate, userId, deviceId).then((data) =>{
      if(data.message) {
        setMessage(data.message)
      }
    })
  }

  const setOrder = (deviceId, userId) => {
    console.log(userId)
    if (!Number.isInteger(userId)) {
      setMessage('Вы не авторизованы')
    }
    createOrder(deviceId, userId).then(()=>navigate(BASKET_ROUTE))
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.brandName}>
          <div className={styles.brand}>{brand.name}</div>
            <div className={styles.name}>{device.name}</div>
        </div>
        <div className={styles.device}>
          <div className={styles.device__image}>
            <Image src={process.env.REACT_APP_API_URL + device.img} />
          </div>
          <div className={styles.device__params}>
            <div className={styles.star}>{device.rating}</div>
          </div>
          <div className={styles.device__price}>
            <div className={styles.price}>{device.price} грн</div>
            <MyButton name={'В корзину'} onClick={()=>setOrder(id, user.id)}/>
          </div>
        </div>
        <div className={styles.rating}>
          <div className={styles.rating__col}>
            <span>Оцените товар</span>
            <span className={styles.rating__rate}><Rating rate={setRate} /></span>
          </div>
          <div className={styles.rating__row}>
            <MyButton name={'Оценить'} onClick={()=>setRating(rate, user.id, id)}/>
            <div className={styles.rating__message}>{message}</div>
            {message &&
              <MyButton name={'Ok'} danger={true} onClick={() => setMessage('')}/>}
          </div>
            
        </div>
        <div className={styles.info}>
          <div className={styles.info__text}>Характеристики</div>
          {device.info.map((info, index) => 
            <div className={styles.info__row} key={info.id}>
              <div className={styles.info__title}>{info.title}: </div>
              <div className={styles.info__description}>{info.description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DevicePage;