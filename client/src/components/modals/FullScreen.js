import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/FullScreen.module.scss';


const FullScreen = ({countimage, onExit, images, modalOpacity}) => {
  const modalImages = useRef(null)//для вычисления ширины картинки в px
  const time = 250//задержка
  const imageNum = 1;//Количество картинок в видимой части
  const [countImage, setCountImage] = useState(countimage);//счетчик
  const [items, setItems] = useState([]);//array of count images
  const [shift, setShift] = useState(false); //сдвиг mouse
  const [offset, setOffset] = useState(0);//сдвиг fullscreen__images в %
  const [transition, setTransition] = useState(time);//задержка сдвига fullscreen__images
  const [disabled, setDisabled] = useState(false);//для кнопок next, prev 
  const [shiftX, setShiftX] = useState(0)//величина движения (координата точки в движении)
  const [shiftX0, setShiftX0] = useState(0)//начальная величина движения (координата точки нажатия)
  const [shiftCount, setShiftCount] = useState(0)//счетчик по сдвигу
  const [delta, setDelta] = useState(0);// сдвиг fullscreen__images в рх
  const [scale, setScale] = useState(1);//масштаб
  const [pointX, setPointX] = useState(0);//сдвиг по горизонтали
  const [pointY, setPointY] = useState(0);//сдвиг по вертикали
  const [start, setStart] = useState({ x: 0, y: 0 });//стартовая позиция сдвига
  const [cursor, setCursor] = useState('zoom-in');
    
  useEffect(() => {
    if(images.length) {
      drowImage()
    }
  }, [images, countImage, scale])
   
  const nextImg = () => {
    setOffset((-1-imageNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countImage + 1)
    }, time)
  }
  const prevImg = () => {
    setOffset((1-imageNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countImage - 1)
    }, time)
  }
  const onCount = (count) => {
    setDisabled(false)
    if (count >= images.length) {
      setCountImage(count - images.length)
    } else {
      if (count < 0) {
        setCountImage(images.length + count)
      } else {
        if(count === countImage) {
          setInit(items)
        } else {
          setCountImage(count)
        }
      }
    }
  }
  //Исходное состояние
  const setInit = (array) => {
    setTransition(0)
    setShiftCount(0)
    setDelta(0)
    if(scale === 1) setOffset((-imageNum) * 100 / array.length)
    if(scale !== 1) setOffset(0)
    setShiftX(0)
    setShiftX0(0)
  }
  //Показ иконок
  const drowImage = () => {
    let arr = [];
    if (scale === 1) {
      for (let i = countImage - imageNum; i <= countImage + 2 * imageNum - 1; i++) {
        let item;
        if (i > images.length - 1) {
          item = i - images.length;
        } else {
          if (i < 0) {
            item = i + images.length;
          } else {
            item = i;
          }
        }
        arr.push(item);
      }
    } else {
      arr.push(countImage)
    }
    
    setInit(arr)
    setItems(arr)
  }

  function begin(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    setTimeout(() => {
      setShift(true);
      setCursor('grab')
    }, 100)
    if(scale === 1) {  
      setShiftX0(event.clientX);
      setShiftX(event.clientX);
      setTransition(0);
    } else {
      setStart({ x: event.clientX - pointX, y: event.clientY - pointY });
    }
  }

  function move(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    if (!shift) {
      return;
    }
    if (scale === 1) {
      setShiftX(event.clientX);
      let translate = shiftX - shiftX0;
      setDelta(translate);
      setShiftCount(Math.round(translate / (modalImages.current.getBoundingClientRect().width / items.length)))
    } else {
      if (event.clientX - start.x >= event.target.clientWidth * (1 - scale) / 2 && event.clientX - start.x <= event.target.clientWidth * (scale - 1) / 2) {
        setPointX(event.clientX - start.x);
      }
      if (event.clientY - start.y >= event.target.clientHeight * (1 - scale) / 2 && event.clientY - start.y <= event.target.clientHeight * (scale - 1) / 2) {
        setPointY(event.clientY - start.y);
      }
    }
  }

  function end(e) {
    if (shift) {
      setShift(false)
      setTransition(time)
      setDelta(Math.round((modalImages.current.getBoundingClientRect().width / items.length)) * shiftCount)
      scale === 1 ? setCursor('zoom-in') : setCursor('zoom-out')
      setTimeout(() => {
        onCount(countImage - shiftCount)
      }, time)
    } else {
      if (scale === 1) zoomPlus()
      if (scale === 1.5) zoomMinus()
      setTimeout(() => {
        setShift(false)
        scale === 1 ? setCursor('zoom-out') : setCursor('zoom-in')
      }, 100)
    }
    
  }
  function onleave () {
    setShift(false)
    setTransition(time)
    setDelta(Math.round((modalImages.current.getBoundingClientRect().width / items.length)) * shiftCount)
    setTimeout(() => {
      onCount(countImage - shiftCount)
    }, time)
  }

  const zoomPlus = () => {
    setScale(1.5)
    setCursor('zoom-out')
  }
  const zoomMinus = () => {
    setScale(1)
    setPointX(0)
    setPointY(0)
    setCursor('zoom-in')
  }

  return (
    <div className={styles.modalFS} style={{ opacity: modalOpacity }}>
      <div className={styles.modalFS__slider}>
        <div className={styles.modalFS__images} ref={modalImages} style={{ width: `${items.length * 100 / imageNum}%`, transform: `translateX(calc(${offset}% + ${delta}px))`, transition: `all ${transition}ms ease`, cursor: `${cursor}` }} onMouseLeave={onleave}>
          {items.map((item, i)=>
            <div className={styles.modalFS__image} key={i} style={{ width: `${100 / imageNum}%`, transform: `translate( ${pointX}px, ${pointY}px) scale(${scale})` }} onMouseDown={begin} onTouchStart={begin} onMouseMove={move} onTouchMove={move} onMouseUp={end} onTouchEnd={end} >
              <img src={process.env.REACT_APP_API_URL + images[item].img} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.modalFS__drive}>
        <div className={styles.numberlist}>{countImage + 1}</div>
        <button className={styles.modalFS__prev} onClick={prevImg} disabled={disabled}></button>
        <button className={styles.modalFS__next} onClick={nextImg} disabled={disabled}></button>
        {scale === 1? 
          <button className={styles.modalFS__zoomIn} onClick={zoomPlus}></button>
          :<button className={styles.modalFS__zoomOut} onClick={zoomMinus}></button>
        }
        <button className={styles.modalFS__close} onClick={onExit}></button>
      </div>
    </div>
  );
};
export default FullScreen;