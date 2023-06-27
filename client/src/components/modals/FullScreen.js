import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/FullScreen.module.scss';


const FullScreen = ({countimage, onExit, images, modalOpacity}) => {
  const modalImages = useRef(null)//to calculate image width in px / для вычисления ширины картинки в px
  const time = 250//delay / задержка
  const imageNum = 1;//The number of pictures in the visible part / Количество картинок в видимой части
  const [countImage, setCountImage] = useState(countimage);//counter / счетчик
  const [items, setItems] = useState([]);//array of count images
  const [shift, setShift] = useState(false); //move mouse pointer / сдвиг указателя мыши
  const [offset, setOffset] = useState(0);//offset fullscreen__images in %/ смещение fullscreen__images в %
  const [transition, setTransition] = useState(time);//offset delay fullscreen__images / задержка сдвига fullscreen__images
  const [disabled, setDisabled] = useState(false);//disabled for buttons next, prev 
  const [shiftX, setShiftX] = useState(0)//offset value / величина смещения (координата точки в движении)
  const [shiftX0, setShiftX0] = useState(0)//start offset value / начальная величина смещения (координата точки нажатия)
  const [shiftCount, setShiftCount] = useState(0)//offset counter / счетчик по смещению
  const [delta, setDelta] = useState(0);//offset fullscreen in px / сдвиг fullscreen__images в рх
  const [scale, setScale] = useState(1);//scale / масштаб
  const [pointX, setPointX] = useState(0);//offset X / сдвиг по горизонтали
  const [pointY, setPointY] = useState(0);//offset Y / сдвиг по вертикали
  const [start, setStart] = useState({ x: 0, y: 0 });//start offset(x, y) / стартовая позиция сдвига
  const [cursor, setCursor] = useState('zoom-in');//set cursor
    
  useEffect(() => {
    if(images.length) {
      drowImage()
    }
  }, [images, countImage, scale])
  
  //next image function
  const nextImg = () => {
    setOffset((-1-imageNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countImage + 1)
    }, time)
  }

  //previous image function
  const prevImg = () => {
    setOffset((1-imageNum)*100/items.length);
    setDisabled(true)
    setTransition(time)
    setTimeout(()=>{
      onCount(countImage - 1)
    }, time)
  }

  //set count if >= length or < 0
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
  //The initial state / Исходное состояние
  const setInit = (array) => {
    setTransition(0)
    setShiftCount(0)
    setDelta(0)
    if(scale === 1) setOffset((-imageNum) * 100 / array.length)
    if(scale !== 1) setOffset(0)
    setShiftX(0)
    setShiftX0(0)
  }
  //Showing icons / Показ картинок
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

  //start position
  function begin(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    setTimeout(() => {//if time > 300ms, form the image offset 
      setShift(true);
      setCursor('grab')
    }, 300)
    if(scale === 1) {  
      setShiftX0(event.clientX);
      setShiftX(event.clientX);
      setTransition(0);
    } else {
      setStart({ x: event.clientX - pointX, y: event.clientY - pointY });
    }
  }

  //move position
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

  //finish position
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
      setTimeout(() => { //if time > 300 ms stop image offset, else onclick zoom+/-
        setShift(false)
        scale === 1 ? setCursor('zoom-out') : setCursor('zoom-in')
      }, 300)
    }
    
  }

  //onMouseLeave function (for finish position)
  function onleave () {
    setShift(false)
    setTransition(time)
    setDelta(Math.round((modalImages.current.getBoundingClientRect().width / items.length)) * shiftCount)
    setTimeout(() => {
      onCount(countImage - shiftCount)
    }, time)
  }

  //set scale
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