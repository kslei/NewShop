import React from 'react';
import styles from '../styles/form/Image.module.scss';

const Image = ({src, alt}) => {
  
  return (
  <div className={styles.image}>
    <img className={styles.image__img} src={src} alt={alt} ></img>
  </div>
  );
};
export default Image;