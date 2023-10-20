import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_ROUTE, ABOUT_ROUTE, BASKET_ROUTE, DELIVERY_ROUTE } from '../utils/consts';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/Navbar.module.scss';

const NavBar = ({onclick}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [scroll, setScroll] = useState(0)
  const navigate = useNavigate()

  //multulanguage
  const {t} = useTranslation()

  window.addEventListener('resize', function () {
    width();
  });
  
  useEffect(() => {
    width()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  const width = () => {
    let w = window.innerWidth;
    if (w >= 767) {
      setMenuVisible(true)
    } else {
      setMenuVisible(false)
    }
  }

  const handleScroll = () => {
    setScroll(window.scrollY)
  }
  
  const onMenuVisible = (vis) => {
    vis ? setMenuVisible(false) : setMenuVisible(true)
  }
  
  return (
    <div className={styles.navbar} style={scroll > 76 && window.innerWidth<768 ? {padding: '10px 0'}: {padding: '5px 0'}}>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <div className={styles.menu__icon}>
            <div className={styles.icon + ' ' + styles.iconmenu} onClick={() => onMenuVisible(menuVisible)} ></div>
            {scroll > 76 &&
              <div className={styles.box}>
                <div className={styles.icon + ' ' + styles.iconbasket} onClick={() => navigate(BASKET_ROUTE)}></div>
                {sessionStorage.getItem('basketDevices') && JSON.parse(sessionStorage.getItem('basketDevices')).length !==0 &&
                  <div className={styles.numberbasket}>{JSON.parse(sessionStorage.getItem('basketDevices')).length}</div>
                }
              </div>
            }
          </div>
           {menuVisible &&
            <div className={styles.menu__content}>
              <Link className={styles.link} to={HOME_ROUTE} onClick={() => {width(); onclick(-1)}} >{t("Home")}</Link>
              <div className={styles.menu__content_shop}>
                {scroll > 76 &&
                  <Link className={styles.link} to={BASKET_ROUTE} onClick={() => width()}>{t("Basket")}
                    {sessionStorage.getItem('basketDevices') && JSON.parse(sessionStorage.getItem('basketDevices')).length !== 0 &&
                      <div className={styles.numberbasket} style={{top: '0', right: '-6px'}}>{JSON.parse(sessionStorage.getItem('basketDevices')).length}</div>
                    }
                  </Link>
                }
                <Link className={styles.link} to={ABOUT_ROUTE} onClick={() => width()}>{t("About_Store")}</Link>
                <Link className={styles.link} to={DELIVERY_ROUTE} onClick={() => width()}>{t("Payment")} {t("and")} <span style={{textTransform: "lowercase"}}>{t("Delivery")}</span></Link>
              </div>
            </div>
          }
        </div>  
      </div>
    </div>
  );
};
export default NavBar;