import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { width } from '../utils/width';
import MyButton from '../forms/MyButton';
import styles from '../styles/components/BrandBar.module.scss';

const BrandBar = observer(() => {
  const [visible, setVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  const {device} = useContext(Context)
  
  window.addEventListener('resize', function () {
    width(setBtnVisible, setVisible);
  });

  useEffect(() => {
    width(setBtnVisible, setVisible)
  }, [])

  function onVisible(vis) {
    if (vis) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  
  return (
    <div className={styles.brandBar}>
      {btnVisible && <MyButton name={'Бренды'} danger={visible} onClick={() => onVisible(visible)}></MyButton>}
      {visible &&
        <div className={styles.brandBar__items}>
          <Link className={styles.brandBar__link} onClick={() => { device.setSelectedBrand(-1); width(setBtnVisible, setVisible)}} >Показать все</Link>
          {device.brands.map(brand =>
            <Link className={styles.brandBar__link} key={brand.id} onClick={() => { device.setSelectedBrand(brand); width(setBtnVisible, setVisible)}}>{brand.name}</Link>
          )}
        </div>
      }
    </div>
  );
})
export default BrandBar;