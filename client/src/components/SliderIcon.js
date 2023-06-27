import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/SliderIcon.module.scss';

const SliderIcon = ({icons, setImage}) => {
  const iconImages = useRef(null)//to calculate image width in px / для вычисления ширины иконки в px
  const time = 500//delay / задержка
  let iconNum = 4;//The number of pictures in the visible part / Количество иконок в видимой части
  const [countIcon, setCountIcon] = useState(0);//Counter / счетчик
  const [items, setItems] = useState([]);//array of count icons
  const [shift, setShift] = useState(false); //move mouse pointer / сдвиг указателя мыши
  const [offset, setOffset] = useState(0);//offset fullscreen__images in %/ смещение fullscreen__images в %
  const [transition, setTransition] = useState(time);//offset delay fullscreen__images / задержка сдвига fullscreen__images
  const [disabled, setDisabled] = useState(false);//disabled for buttons next, prev 
  const [shiftX, setShiftX] = useState(0)//offset value / величина движения (координата точки в движении)
  const [shiftX0, setShiftX0] = useState(0)//start offset value / начальная величина движения (координата точки нажатия)
  const [shiftCount, setShiftCount] = useState(0)//offset counter / счетчик по смещению
  const [delta, setDelta] = useState(0);//offset fullscreen in px / сдвиг fullscreen__images в рх
  
  useEffect(() => {
    if(icons.length) {
      drowIcon()
    }
  }, [icons, countIcon])
  
  //set icons number
  window.innerWidth > 767.98 || window.innerWidth <= 560 ? iconNum = 4 : iconNum = 3
  if (icons.length <= iconNum) iconNum = icons.length  

  //next count image
  const nextIconImg = () => {
    setOffset((-1-iconNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countIcon + 1)
    }, time)
  }
  //prev count image
  const prevIconImg = () => {
    setOffset((1-iconNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countIcon - 1)
    }, time)
  }

  //set count
  const onCount = (count) => {
    setDisabled(false)
    if (count >= icons.length) {
      setCountIcon(count - icons.length)
    } else {
      if (count < 0) {
        setCountIcon(icons.length + count)
      } else {
        if(count === countIcon) {
          setInit(items)
        } else {
          setCountIcon(count)
        }
      }
    }
  }
  //The initial state / Исходное состояние
  const setInit = (array) => {
    setTransition(0)
    setShiftCount(0)
    setDelta(0)
    setOffset((-iconNum) * 100 / array.length)
    setShiftX(0)
    setShiftX0(0)
  }
  //Show icons / Показ иконок
  const drowIcon = () => {
    let arr = [];
    for (let i = countIcon - iconNum; i <= countIcon + 2 * iconNum - 1; i++) {
      let item;
      if (i > icons.length - 1) {
        if (i >= 2 * icons.length) {
          item = i - 2 * icons.length;
        } else {
          item = i - icons.length;
        }
      } else {
        if (i < 0) {
          item = i + icons.length;
        } else {
          item = i;
        }
      }
      arr.push(item);
    }
    setInit(arr)
    setItems(arr)
  }
  //start position
  function begin(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    setShiftX0(event.clientX);
    setShiftX(event.clientX);
    setTransition(0);
    setTimeout(() => {
      setShift(true);
    }, 100)
  }
  //move position
  function move(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    if (!shift) {
      return;
    }
    setShiftX(event.clientX);
    let translate = shiftX - shiftX0;
    setDelta(translate);
    setShiftCount(Math.round(translate / (iconImages.current.getBoundingClientRect().width/items.length)))
  }
  //finish position
  function end(icon) {
     if (shift) {
      setShift(false)
    } else {
      if(icon.type) setImage(icon)
      setTimeout(()=>{
        setShift(false)
      }, 100)
    }
    setTransition(time)
    setDelta(Math.round((iconImages.current.getBoundingClientRect().width / items.length))*shiftCount)
    setTimeout(()=>{
      onCount(countIcon - shiftCount)
    }, time)
  }
  
  return (
  <div className={styles.slider__icon}>
    <button className={styles.icon__prev} onClick={prevIconImg} disabled={disabled}></button>
    <div className={styles.icon} onMouseLeave={() => end({})}>
        <div className={styles.icon__images} ref={iconImages}  style={{ width: `${items.length * 100 / iconNum}%`, transform: `translateX(calc(${offset}% + ${delta}px))`, transition: `all ${transition}ms ease`}}>
        {items.length && items.map((item, i) => 
          <div className={styles.icon__image} key={i} style={{ width: `${100 / iconNum}%` }} onMouseDown={begin} onTouchStart={begin} onMouseMove={move} onTouchMove={move} onMouseUp={() => end(icons[item])} onTouchEnd={() => end(icons[item])}>
            {icons[item].type === 'frame' && <div className={styles.icon__image_frames} ></div>}
            <img src={process.env.REACT_APP_API_URL + icons[item].src}/>
          </div>
        )}
      </div>
    </div>
    <button className={styles.icon__next} onClick={nextIconImg} disabled={disabled}></button>
  </div>
  );
};
export default SliderIcon;