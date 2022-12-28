import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE, ABOUT_ROUTE } from '../utils/consts';
import menuIcon from '../images/menu.png';
import styles from '../styles/components/Navbar.module.scss';

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  window.addEventListener('resize', function () {
    width();
  });

  useEffect(() => {
    width()
  }, [])
  const width = () => {
    let w = window.innerWidth;
    if (w > 767) {
      setMenuVisible(true)
    } else {
      setMenuVisible(false)
    }
  }
  const onMenuVisible = (vis) => {
    vis ? setMenuVisible(false) : setMenuVisible(true)
  }
  console.log(menuVisible)

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <div className={styles.menu__icon}>
            <img className={styles.icon} src={menuIcon} onClick={() => onMenuVisible(menuVisible)} ></img>
          </div>
           {menuVisible &&
            <div className={styles.menu__content}>
              <Link className={styles.link} to={SHOP_ROUTE} onClick={() => width()} >Главная</Link>
              <div className={styles.menu__content_shop}>
                <Link className={styles.link} to={ABOUT_ROUTE} onClick={() => width()}>О магазине</Link>
                <Link className={styles.link} to={ABOUT_ROUTE} onClick={() => width()}>Оплата и доставка</Link>
              </div>
            </div>
          }
        </div>  
        
        
      </div>
    </div>
  );
};
export default NavBar;