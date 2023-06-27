import React, {useRef, useEffect, useState} from 'react';
import styles from '../styles/components/SliderNews.module.scss';
import { DEVICE_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';


const SliderNews = ({devices}) => {
  const navigate = useNavigate();
  const Images = useRef(null)//to calculate image width in px / для вычисления ширины картинки в px
  const time = 500//delay / задержка
  let imagesNum = 4;//The number of pictures in the visible part / Количество картинок в видимой части
  const [play, setPlay] = useState(true);//play / pause
  const [count, setCount] = useState(0);//counter / счетчик
  const [items, setItems] = useState([]);//array of count devices
  const [shift, setShift] = useState(false); //move mouse pointer / сдвиг указателя мыши
  const [offset, setOffset] = useState(0);//offset icon__images in % / смещение icon__images в %
  const [transition, setTransition] = useState(time);//offset delay icon__images / задержка смещения icon__images
  const [disabled, setDisabled] = useState(false);//disabled for buttons next, prev 
  const [shiftX, setShiftX] = useState(0)//offset move / величина движения (координата точки в движении)
  const [shiftX0, setShiftX0] = useState(0)//start offset move / начальная величина движения (координата точки нажатия)
  const [shiftCount, setShiftCount] = useState(0)//offset counter / счетчик по смещению
  const [delta, setDelta] = useState(0);//offset icon__images in px / сдвиг icon__images в рх

  //play
  useEffect(() => {
    if (play) {
      const int = setInterval(() => {
        nextImg()
      }, 5000)
      return () => clearInterval(int)
    }
  }, [count, play])

  useEffect(() => {
    if (devices.length) {
      drowImage()
    }
  }, [devices, count])

  //set images number
  if(window.innerWidth > 1399.98) {
    imagesNum = 4;
  } else {
    if (window.innerWidth > 767.98) {
      imagesNum = 3
    } else {
      if (window.innerWidth > 480) {
        imagesNum = 2
      } else {
        imagesNum = 1
      }
    }
  } 
  if (devices.length <= imagesNum) imagesNum = devices.length  

  //set next / previous image count
  const nextImg = () => {
    setDisabled(true)
    if (imagesNum !== devices.length) {
    setOffset((-1 - imagesNum) * 100 / items.length);
    setTransition(time)
    setTimeout(() => {
      onCount(count + 1)
    }, time)
  }
  }
  const prevImg = () => {
    setDisabled(true)
    if (imagesNum !== devices.length) {
    setOffset((1 - imagesNum) * 100 / items.length);
    setTransition(time)
    setTimeout(() => {
      onCount(count - 1)
    }, time)
  }
  }
  //set count if >= length or < 0
  const onCount = (countImg) => {
    setDisabled(false)
    if (countImg >= devices.length) {
      setCount(countImg - devices.length)
    } else {
      if (countImg < 0) {
        setCount(devices.length + countImg)
      } else {
        if (countImg === count) {
          setInit(items)
        } else {
          setCount(countImg)
        }
      }
    }
  }
  //The initial state / Исходное состояние
  const setInit = (array) => {
    setTransition(0)
    setShiftCount(0)
    setDelta(0)
    setOffset((-imagesNum) * 100 / array.length)
    setShiftX(0)
    setShiftX0(0)
  }
  //Show images / Показ картинок
  const drowImage = () => {
    let arr = [];
    for (let i = count - imagesNum; i <= count + 2 * imagesNum - 1; i++) {
      let item;
      if (i > devices.length-1) {
        if (i >= 2*devices.length) {
          item = i - 2*devices.length;
        } else {
          item = i - devices.length;
        }
      } else {
        if (i < 0) {
          item = i + devices.length;
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
      if (imagesNum !== devices.length) {
      setShift(true);
      }
    }, 300)
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
    setShiftCount(Math.round(translate / (Images.current.getBoundingClientRect().width / items.length)))
  }

  //finish position
  function end(device) {
    if (shift) {
      setShift(false)
    } else {
      if(device.id) navigate(DEVICE_ROUTE + '/' + device.id)
      setTimeout(() => {
        setShift(false)
      }, 300)
    }
    setTransition(time)
    setDelta(Math.round((Images.current.getBoundingClientRect().width / items.length)) * shiftCount)
    setTimeout(() => {
      onCount(count - shiftCount)
    }, time)
  }

  return (
    <div className={styles.sliderNews} onMouseEnter={()=>setPlay(false)} onMouseLeave={()=>setPlay(true)}>
      <div className={styles.slider__icon}></div>
      <button className={styles.slider__prev} onClick={prevImg} disabled={disabled}></button>
      <button className={styles.slider__next} onClick={nextImg} disabled={disabled}></button>
      <div className={styles.slider} onMouseLeave={() => end({})}>
        <div className={styles.slider__images} ref={Images} style={{ width: `${items.length * 100 / imagesNum}%`, transform: `translateX(calc(${offset}% + ${delta}px))`, transition: `all ${transition}ms ease` }}>
          {items.length !== 0 && items.map((item, i) =>
            <div className={styles.slider__image} key={i} style={{ width: `${100 / imagesNum}%` }} onMouseDown={begin} onTouchStart={begin} onMouseMove={move} onTouchMove={move} onMouseUp={() => end(devices[item])} onTouchEnd={() => end(devices[item])}>
              <img src={process.env.REACT_APP_API_URL + devices[item].img} />
              <div className={styles.slider__text}><p>{devices[item].brand.name}</p> {devices[item].name}</div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};
export default SliderNews;