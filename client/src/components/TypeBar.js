import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../forms/MyButton';
import { width } from '../utils/width';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import styles from '../styles/components/TypeBar.module.scss';

const TypeBar = observer(() => {
  const [visible, setVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const {device} = useContext(Context)

  window.addEventListener('resize', function () {
    width(setBtnVisible, setVisible);
  });

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
      {btnVisible &&
        <MyButton name={'Типы'} danger={visible} onClick={() => onVisible(visible)}></MyButton>
      }
      {visible &&
        <div className={styles.typeBar__items}>
          {device.types.map(type =>
            <Link className={styles.typeBar__link} key={type.id} onClick={() => {
              device.setSelectedType(type); 
              device.setPage(1);
              width(setBtnVisible, setVisible);
              device.setSelectedBrand(-1);
            }}>{type.name}</Link>
          )}
        </div>
      }
    </div>
  );
});
export default TypeBar;