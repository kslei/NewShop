import React from 'react';
import Image from '../forms/Image';
import styles from '../styles/components/DeviceItem.module.scss';

const TypeItem = ({type, onclick}) => {
  
  return (
    <div className={styles.deviceItem} onClick={() => onclick(type)}>
      <div className={styles.deviceItem__image}>
        <Image src={process.env.REACT_APP_API_URL + type.img} />
      </div>
      <div className={styles.deviceItem__name}>
        {type.name}
      </div>
    </div>
  );
};
export default TypeItem;