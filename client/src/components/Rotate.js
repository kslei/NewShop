import React, {useEffect, useState} from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import styles from '../styles/components/Rotate.module.scss'

const Rotate = ({frames}) => {
  const [info, setInfo] = useState(false);//infopanel
  const [playAuto, setPlayAuto] = useState(true);//autorotate / автовращение
  const [stepOrbit, setStepOrbit] = useState(true);//orbit/move / вращениe/сдвиг кадра
  const [count, setCount] = useState(0);//step orbit / шаг вращения
  const [paning, setPaning] = useState(false);//paning - move / панорама - сдвиг
  const [pointX, setPointX] = useState(0);//offset X / сдвиг по горизонтали
  const [pointY, setPointY] = useState(0);//offset Y / сдвиг по вертикали
  const [start, setStart] = useState({x: 0, y: 0});//start offset / стартовая позиция сдвига
  const [finish, setFinish] = useState({x: 0, y: 0});//finish offset / финишная позиция сдвига
  const [xStart, setXStart] = useState(0);//start orbit / стартовая позиция вращения
  const [xCurrent, setXCurrent] = useState(0);//current rotation position / текущая позиция вращения
  const [pos0, setPos0] = useState(0);
  const [scale, setScale] = useState(1);//scale / шкала кадра
  const scaleMax = 2.5;//max scale
  const handle = useFullScreenHandle();//handle.active = true - fullscreen
  
  useEffect(() => {
    if (playAuto) {
      const int = setInterval(() => {
      prevCount()
      }, 120)
    return () => clearInterval(int)
    }
  }, [count, playAuto])
  
  //counterclockwise rotation step (next)/rotation step clockwise (prev) / Шаг вращения против чс (next)/по чс (prev)
  const nextCount = () => {
    count + 1 < frames.length ? setCount(count+1) : setCount(0);
  }
  const prevCount = () => {
    count - 1 >= 0 ? setCount(count-1) : setCount(frames.length - 1);
  }

  //start function / Нажатие кнопки/касание сенсора для кадров
  function begin(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    if (playAuto) {
      setPlayAuto(false)
    }
    setPaning(true);
    if (!stepOrbit) {
      setStart({ x: event.clientX - pointX, y: event.clientY - pointY });
    } else {
      setXStart(event.clientX - pointX);
    }
  }

  //Move function / Движение мыши/точки касания для кадров
  function move(e) {
    e.preventDefault();
    let event;
    e.type.search('touch') !== -1 ? event = e.touches[0] : event = e;
    if (!paning) {
      return;
    }
    if (!stepOrbit) {
      if (event.clientX - start.x >= event.target.clientWidth * (1 - scale) / 2 && event.clientX - start.x <= event.target.clientWidth * (scale - 1) / 2) {
        setPointX(event.clientX - start.x);
      }
      if (event.clientY - start.y >= event.target.clientHeight * (1 - scale) / 2 && event.clientY - start.y <= event.target.clientHeight * (scale - 1) / 2) {
        setPointY(event.clientY - start.y);
      }
    } else {
      setXCurrent(event.clientX - pointX);
      let pos = Math.floor((xStart - xCurrent) / 22);
      if (pos < pos0) nextCount();
      if (pos > pos0) prevCount();
      setPos0(pos);
    }
  }

  //Finish function / Отпускание кнопки/удаление точки касания с сенсора для кадров
  function end(e) {
    setPaning(false);
    setPos0(0);
    if (!stepOrbit) {
      setFinish({ x: e.clientX - pointX, y: e.clientY - pointY })
    }
    //Center position / если между нажатием и отпусканием кнопки мыши (click) нет изменения координат, то центруем изображение
    if (e.type.search('touch') == -1 && finish.x === start.x && finish.y === start.y) {
      setPointX(0);
      setPointY(0);
    }
  }
  //if onmouseleave, then stop move / Выход курсора за пределы кадра останавливает move
  function onLeave() {
    setPaning(false);
    setPos0(0);
  }
  //frames scale funtions / Установка масштаба (ZOOM) раскадровки
  const zoomPlus = () => {
    scale * 1.2 <= scaleMax ? setScale(scale * 1.2) : setScale(scaleMax);
    if (scale > 2) {
      setStepOrbit(false);
      setPlayAuto(false)
    }
  }
  const zoomMinus = () => {
    setPointX(0);
    setPointY(0);
    scale / 1.2 >= 1 ? setScale(scale / 1.2) : setScale(1);
    if (scale <= 2) {
      setStepOrbit(true);
    }
  }
    
  return (
    <FullScreen handle={handle}>
    <div className={styles.content} onMouseLeave={onLeave}>
      <div className={styles.content__image} onMouseDown={begin} onTouchStart={begin} onMouseMove={move} onTouchMove={move} onMouseUp={end} onTouchEnd={end} style={{ transform: `translate( ${pointX}px, ${pointY}px) scale(${scale})` }}>
        <img src={process.env.REACT_APP_API_URL + frames[count].frame}></img>
      </div>
      <div className={styles.content__buttons}>
        <button className={styles.info} onClick={() => setInfo(!info)}>i
          {info && <div className={styles.info__panel}></div>}
        </button>
        <button className={playAuto? styles.autoStop : styles.autoPlay} onClick={() => setPlayAuto(!playAuto)} ></button>
        <button className={styles.zoomIn} onClick={zoomPlus} ></button>
        <button className={styles.zoomOut} onClick={zoomMinus} ></button>
        <button className={stepOrbit? styles.move : styles.stepOrbit} onClick={() => {setStepOrbit(!stepOrbit); setPlayAuto(false)}}></button>
        {!handle.active ?
        <button className={styles.fullScreen} onClick={handle.enter}></button>
        :<button className={styles.winScreen} onClick={handle.exit}></button>
        }
      </div>
    </div>
    </FullScreen>
  );
};
export default Rotate;