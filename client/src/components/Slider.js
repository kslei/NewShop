import React, {useEffect, useState} from 'react';
import {Images} from '../utils/images';
import styles from '../styles/components/Slider.module.scss';

const Slider = () => {
  const [items, setItems] = useState([Images[Images.length - 1], Images[0], Images[1]]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(-33.3333333333);
  const [transition, setTransition] = useState('all linear 1s');
      
  useEffect(()=> {
    drow()
  }, [count])

  const prev = () => {
    setTransition('all linear 1s')
    setOffset(0);
    if (count - 1 < 0) {
      setCount(Images.length - 1)
    } else {
      setCount(count - 1);
    }
  }

  const next = () => {
    setTransition('all linear 1s')
    setOffset(-66.6666666666);
    if (count + 1 > Images.length - 1) {
      setCount(0)
    } else {
      setCount(count+1);
    }
  }
  
  const drow = () => {
    setTimeout(() => {
      if (count > (Images.length-1)) {setCount(0)};
      if (count === 0) {
        setItems([Images[Images.length-1], Images[count], Images[count+1]])
        } else {
          if (count === Images.length-1) {
          setItems([Images[count - 1], Images[count], Images[0]])
          } else {
            setItems([Images[count - 1], Images[count], Images[count + 1]]);
          }
      }
      setTransition('none')
      setOffset(-33.33333333)
    }, 1000);
  }
    
  return (
  <div className={styles.containSlider}>
    <div className={styles.slider}>
      <div className={styles.slider__items} style={{transform: `translateX(${offset}%)`, transition: `${transition}`}}>
      {items.map((item, i) => 
        <div key={i} className={styles.slider__item}>
          <div className={styles.image}>
            <img src={item.img}></img>
          </div>
        </div>
      )}
      </div>
    </div>
    <div className={styles.slider__btn_prev} onClick={() => prev()}></div>
    <div className={styles.slider__btn_next} onClick={() => next()}></div>
  </div>
  );
};
export default Slider;