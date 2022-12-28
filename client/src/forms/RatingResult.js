import React from 'react';
import styles from '../styles/form/RatingResult.module.scss';

const RatingResult = ({rate}) => {
  let style = [];
  for (let i=0; i<5; i++) {
    rate >= i+1 
    ? style.push({id: i, style: styles.active})
    : style.push({id: i, style: styles})
  }
  return (
    <div className={styles.ratingResult}>
      {style.map(item => <span key={item.id} className={item.style}></span>)}
      <div className={styles.ratingResult__text}>{rate}</div>
    </div>
  );
};
export default RatingResult;