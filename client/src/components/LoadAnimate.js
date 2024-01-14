import React, { useEffect, useState } from 'react';
import styles from '../styles/components/LoadAnimate.module.scss';

const LoadAnimate = ({message}) => {
  const [count, setCount] = useState(0)
  const data = message.split('').map((item, i)=> {
    return {id:i, value:item}
  })
  useEffect(()=>{
    setTimeout(()=>{
      up()
    }, 250)
  }, [count])

  const up = () => {
    count < data.length? setCount(count + 1):setCount(0)
  }
  
  return (
  <div className={styles.animate}>
    {data.map(item => (
      <div key={item.id} className={styles.animate__title} style={{color: item.id < count? 'inherit' : 'transparent'}} >{item.value}</div>
    ))}
  </div>
  );
};
export default LoadAnimate;