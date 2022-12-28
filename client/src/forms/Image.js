import React from 'react';
import styles from '../styles/form/Image.module.scss';

const Image = ({src}) => {
  
  return (
  <div className={styles.image}>
    <img className={styles.image__img} src={src}></img>
  </div>
  );
};
export default Image;