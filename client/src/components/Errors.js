import React from 'react';
import MyButton from '../forms/MyButton';
import styles from '../styles/components/Errors.module.scss';

const Errors = ({e, seterrormessage}) => {
  console.log(e)
  return (
  <div className={styles.errors}>
    <div className={styles.line}></div>
    <div className={styles.info}>
      <div className={styles.info__title}>ERROR</div>
      <div className={styles.info__status}>{e.response.status}</div>
      <div className={styles.info__title}>{e.response.statusText}</div>
      {e.response.data.message &&
        <div className={styles.info__message}>{e.response.data.message}</div>
      }
      {e.response.data.errors &&
        e.response.data.errors.map(error =>
          <div key={error.msg} className={styles.info__message}>{error.msg}</div>  
        )}
      
      <MyButton name="OK" danger='true' onClick={()=>seterrormessage('')} />
    </div>
    <div className={styles.line}></div>
  </div>
  );
};
export default Errors;