import React from 'react';
import styles from '../styles/components/BrandItem.module.scss';

const BrandItem = ({ brand, onclick }) => {
  
  return (
    <div className={styles.brandItem} onClick={() => onclick(brand)}>
      <div className={styles.brandItem__image}>
        <img src={process.env.REACT_APP_API_URL + brand.img} />
      </div>
      <div className={styles.brandItem__name}>
        {brand.name}
      </div>
    </div>
  );
};
export default BrandItem;