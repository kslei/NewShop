import React, { useContext, useEffect, useState } from 'react';
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ORDER_ROUTE, PROFILE_ROUTE} from '../utils/consts';
import {useNavigate} from 'react-router-dom';
import logo from '../images/logo.png';
import { observer } from 'mobx-react-lite';
import MyMenu from '../forms/MyMenu';
import { phone } from '../utils/info';
import { Context } from '..';
import basket from '../images/basketinvers.png';
import searchIcon from '../images/search.png';
import phoneIcon from '../images/phone.png';
import MyInput from '../forms/MyInput';
import styles from '../styles/components/Header.module.scss';

const Header = observer(({search, onSearch}) => {
  const navigate = useNavigate();
  const {user} = useContext(Context);
  const [searchVisible, setSearchVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  
  const userMenu = []

  window.addEventListener('resize', function () {
    width();
  });

  useEffect(()=>{
    width()
  }, [])
  const width = () => {
    let w = window.innerWidth;
    if (w > 767) {
      setSearchVisible(true)
      setPhoneVisible(true)
    } else {
      setSearchVisible(false)
      setPhoneVisible(false)
    }
  }
  const onSearchVisible = (vis) => {
    vis ? setSearchVisible(false) : setSearchVisible (true)
  }
  const onPhoneVisible = (vis) => {
    vis ? setPhoneVisible(false) : setPhoneVisible (true)
  }

  if (user.isAuth) {
    userMenu.push(
      { id: 2,
        route: PROFILE_ROUTE,
        name: "Профиль"},
      { id: 3,
        route: SHOP_ROUTE,
        name: "Выйти"},
    )
  } else {
    userMenu.push(
      { id: 0,
        route: REGISTRATION_ROUTE,
        name: "Регистрация"},
      { id: 1,
        route: LOGIN_ROUTE,
        name: "Войти"},
    )
  }
  if (user.isAuth && user.role === 'ADMIN') {
    userMenu.push(
      { id: 5,
        route: ADMIN_ROUTE,
        name: "Admin"},
      { id: 6,
        route: ORDER_ROUTE,
        name: "Заказы"}
    )
  }

  function setKey(item) {
    if (item.id === 3) {
      logOut()
    }
  }

  const logOut = () => {
    console.log("logOut")
    user.setUser({})
    user.setIsAuth(false)
  }

    return (
  <div className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => navigate(SHOP_ROUTE)}>
        <img className={styles.logo__image} src={logo} alt="logo" />
      </div>
      <div className={styles.menu}>
        <div className={styles.menu__icon}>
          <img className={styles.icon} src={searchIcon} onClick={() => onSearchVisible(searchVisible) } ></img>
        </div>
        {searchVisible &&
          <div className={styles.menu__input}>
            <MyInput sm={"true"} type='text' value={search} placeholder='Поиск...' onChange={e => onSearch(e.target.value)} />
          </div>
        }
      </div>  
      <div className={styles.menu}>
        <div className={styles.menu__icon}>
          <img className={styles.icon} src={phoneIcon} onClick={() => onPhoneVisible(phoneVisible)} ></img>
        </div>
        {phoneVisible &&
          <div className={styles.menu__input}>
            <div className={styles.menu__title}>Наши контакты</div>
            {phone.map(item => 
              <div className={styles.menu__item}key={item.id} onClick={()=>setPhoneVisible(false)} >{item.info}</div>
            )}
          </div>
        }
      </div>  
      <div className={styles.user}>
        {user.isAuth
        ?<img className={styles.icon} src={basket} onClick={() => navigate (BASKET_ROUTE)}></img>
        :<img className={styles.icon__dis} src={basket} ></img>
        }
        <MyMenu menu={userMenu} name="user" click={setKey} danger={user.isAuth}/>
      </div>
    </div>
  </div>
  );
});
export default Header;