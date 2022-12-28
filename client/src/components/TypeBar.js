import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../forms/MyButton';
import { width } from '../utils/width';
import styles from '../styles/components/TypeBar.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '..';


const TypeBar = observer(() => {
  const [visible, setVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const {device} = useContext(Context)

  window.addEventListener('resize', function () {
    width(setBtnVisible, setVisible);
  });

  /* function width () {
    let w = window.innerWidth;
    if (w>=560) {
      setVisible(true);
      setBtnVisible(false)
    } else {
      setVisible(false);
      setBtnVisible(true);
    }
  } */

  useEffect (()=> {
    width(setBtnVisible, setVisible)
  },[])

  function onVisible(vis) {
    if (vis) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  
  return (
    <div className={styles.typeBar}>
      {btnVisible && <MyButton name={'Типы'} danger={visible} onClick={() => onVisible(visible)}></MyButton>}
      {visible &&
        <div className={styles.typeBar__items}>
          <Link className={styles.typeBar__link} onClick={()=>device.setSelectedType(-1)}>Показать все</Link>
          {device.types.map(type =>
            <Link className={styles.typeBar__link} key={type.id} onClick={()=>device.setSelectedType(type)}>{type.name}</Link>
          )}
        </div>
      }
    </div>
  );
});
export default TypeBar;