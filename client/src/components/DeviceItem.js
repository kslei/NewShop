import React from 'react';
import Image from '../forms/Image';
import RatingResult from '../forms/RatingResult';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/components/DeviceItem.module.scss';
import {DEVICE_ROUTE} from '../utils/consts';


const DeviceItem = ({device}) => {
  const navigate = useNavigate();
  return (
  <div className={styles.deviceItem} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
    <div className={styles.deviceItem__image}>
      <Image src={process.env.REACT_APP_API_URL+device.img}/>
    </div>
    <div className={styles.deviceItem__name}>
      {device.brand.name}  {device.name}
    </div>
    <div className={styles.deviceItem__price}>{device.price} грн</div>
    <RatingResult rate={device.rating}/>
  </div>
  );
};
export default DeviceItem;