import React from 'react';
import Image from '../forms/Image';
import RatingResult from '../forms/RatingResult';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from '../utils/consts';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/DeviceItem.module.scss';

const DeviceItem = ({device}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();//Internationalization
  
  return (
  <div className={styles.deviceItem} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
    <div className={styles.deviceItem__image}>
      {device.device_images.length
        ? <Image src={process.env.REACT_APP_API_URL + device.device_images[0].img} />
        : <Image src={process.env.REACT_APP_API_URL+device.img} />
      }
      <div className={styles.deviceItem__ads}>
        {device.news &&
          <div className={styles.deviceItem__news}></div>
        }
        {device.discount !==0 &&
          <div className={styles.deviceItem__discount}>-{device.discount}%</div>
        }
      </div>
      
    </div>
    <div className={styles.deviceItem__name}>
      {device.brand.name}  {device.name}
    </div>
    <div className={styles.deviceItem__pricemodule} style={device.number === 0? {opacity: '0.5'} : {opacity: '1'}}>
      {device.discount === 0
      ? <div className={styles.deviceItem__price}>{t("price", { val: device.price })}</div>
      : <div className={styles.deviceItem__price} style={{flexDirection: "column"}}>
          <div className={styles.deviceItem__price_old}>{t("price", { val: device.price })}</div>
          {t("price", {val: Math.floor(device.price * (100 - device.discount) / 100)})}
        </div>
      }
    </div>
    
    <RatingResult rate={device.rating}/>
  </div>
  );
};
export default DeviceItem;