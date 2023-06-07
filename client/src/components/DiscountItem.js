import React, { useEffect, useRef } from 'react';
import Image from '../forms/Image';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import styles from '../styles/components/DiscountItem.module.scss';

const DiscountItem = ({ device, width, i, setheight }) => {
  const div = useRef(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(i === 0) setHeight()
  })

  const setHeight = () => {
    let height = div.current.getBoundingClientRect().height;
    setheight(height)
  }

  return (
    <div className={styles.discountItem} ref={div} style={{width: `calc(${width}% - 30px)`}} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <div className={styles.discountItem__image}>
        {device.device_images.length
          ? <Image src={process.env.REACT_APP_API_URL + device.device_images[0].img} />
          : <Image src={process.env.REACT_APP_API_URL + device.img} />
        }
        <div className={styles.discountItem__discount}>-{device.discount}%</div>
      </div>
      <div className={styles.discountItem__name}>
        <p>{device.brand.name}</p>  {device.name}
      </div>
      
      <div className={styles.discountItem__price}>
        <div className={styles.discountItem__price_old}>{device.price} грн</div>
          {Math.floor(device.price * (100 - device.discount) / 100)} грн
      </div>
      
    </div>
  );
};
export default DiscountItem;