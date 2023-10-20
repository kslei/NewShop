import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyButton from '../forms/MyButton';
import Rating from '../components/Rating';
import { fetchOneDevice, createRating } from '../http/deviceAPI';
import { Context } from '..';
import { BASKET_ROUTE } from '../utils/consts';
import RotateImage from '../components/RotateImage';
import FullScreen from '../components/modals/FullScreen';
import MyInput from '../forms/MyInput';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/DevicePage.module.scss';

const DevicePage = () => {
  const {user} = useContext(Context);
  const [device, setDevice] = useState({info:[], device_frames:[], device_images:[]})
  const [brand, setBrand] = useState('')
  const [rate, setRate] = useState(0);
  const [orderNumber, setOrderNumber] = useState(1);
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(0);
  const [countImage, setCountImage] = useState(0);
  const {id} = useParams();
  const navigate = useNavigate();
  var basketDevices = JSON.parse(localStorage.getItem('basketDevices'));
  const {t, i18n} = useTranslation()
  let lng = i18n.language
  
  useEffect(()=>{
    fetchOneDevice(id, lng).then(data=>{
      setDevice(data);
      setBrand(data.brand);
      data.number === 0 ? setDisabled(true) : setDisabled(false)
    })
  }, [id, lng])
  
  //create rating
  const setRating = (rate, userId, deviceId) => {
    if (!user.isAuth) {
      setMessage(`${t('Not_authorised')}`)
    }
    createRating(rate, userId, deviceId)
  }

  //set basket
  const setOrder = (deviceId, userId) => {
    if (!Number.isInteger(userId)) {
      setMessage(`${t('Not_authorised')}`)
    }
    if(!basketDevices) {basketDevices = []}
    let orderDevice = {
      id: device.id,
      discount: device.discount,
      name: device.name,
      brandId: device.brandId,
      brand: {name: device.brand.name},
      price: device.price,
      quantity: orderNumber
    }
    basketDevices.push(orderDevice)
    localStorage.setItem('basketDevices', JSON.stringify(basketDevices))
    navigate(BASKET_ROUTE)
  }

  //set number device
  const onOrderNumber = (num) => {
    if (num <= device.number && num > 0) {
      setOrderNumber(num)
    }
  }

  //set/out fullscreen
  function onhide(count) {
    setCountImage(count)
    setModal(true)
    setModalOpacity(0)
    setTimeout(()=>{
      setModalOpacity(1)
    }, 100)
    
  }
  function onExit() {
    setCountImage(0)
    setModalOpacity(0)
    setTimeout(()=>{
        setModal(false)
    }, 1000)
  }
  
  //disabled scroll when modal / блокировка scroll при модальном окне
  function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  function enableScroll() {
    window.onscroll = function () { };
  }
  useEffect(() => {
    window.scrollTo(0, 0)// scroll to x=0, y=0
    if (modal) {
      disableScroll();
    } else {
      enableScroll();
    }
    const handleWindowWheel = (event) => {
      if (modal) event.preventDefault()
    };
    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [modal]);
  
  return (
    <div className={styles.container} >
      {modal &&
        <FullScreen onExit={onExit} images={device.device_images} countimage={countImage} modalOpacity={modalOpacity}/>
      }
      <div className={styles.wrapper} >
        <div className={styles.brandName}>
          <div className={styles.brand}>{brand.name}</div>
          <div className={styles.name}>{device.name}</div>
        </div>
        <div className={styles.device}>
          <div className={styles.device__image}>
            {device &&
              <RotateImage img = {device.img} frames={device.device_frames} images={device.device_images} onHide={onhide}/>
            }
            <div className={styles.ads}>
              {device.news &&
                <div className={styles.news}></div>
              }
              {device.discount !==0 &&
                <div className={styles.discount__icon}>-{device.discount}%</div>
              }
            </div>
            <div className={styles.star}>{Math.floor(device.rating)}</div>
          </div>          
          <div className={styles.device__params} style={disabled ? {opacity: '0.5'} : {opacity: '1'}}>
            <div className={styles.device__price} >
              {device.discount ? 
              <div className={styles.discount__price}>
                <div className={styles.oldPrice}>{t("price", { val: device.price })}</div>
                  <div className={styles.price}>{t("price", { val: Math.floor(device.price * (100 - device.discount) / 100) })}</div>
              </div>
              : <div className={styles.price}>{t("price", {val: device.price})}</div>
              }
              <div className={styles.device__order}>
                <MyInput type='number' style={{width: '35px', padding: '5px', margin: '2px'}} value={orderNumber} onChange={(e) => onOrderNumber(e.target.value)} disabled={disabled}/>
                {disabled 
                  ? <MyButton name={t('To_basket')} onClick={() => setMessage(`${ t("Not_available")}`)} />
                  : <MyButton name={t('To_basket')} onClick={()=>setOrder(id, user.id)} />
                }
              </div>
            </div>
            <div className={styles.rating}>
              <div className={styles.rating__col}>
                <span>{t("Rate")} <span style={{textTransform: "lowercase"}}>{t("The")} {t("Product", {count: 1})}</span></span>
                <span className={styles.rating__rate}><Rating rate={setRate} /></span>
              </div>
              <MyButton name={`${t("Rate")}`} onClick={()=>setRating(rate, user.id, id)}/>
              <div className={styles.rating__row}>
                <div className={styles.rating__message}>{message}</div>
                {message &&
                  <MyButton name={'Ok'} danger={true} onClick={() => setMessage('')}/>}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.info__text}>{t("Specifications")}</div>
              {device.info.map(info => 
                <div className={styles.info__row} key={info.id}>
                  <div className={styles.info__title}>{info.title}: </div>
                  <div className={styles.info__description}>{info.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.infosm}>
          <div className={styles.info__text}>{t("Specifications")}</div>
          {device.info.map(info => 
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