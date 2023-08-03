import React, { useContext, useEffect, useState } from 'react';
import {BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, HOME_ROUTE} from '../utils/consts';
import {useNavigate} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MyMenu from '../forms/MyMenu';
import { phone } from '../utils/info';
import { Context } from '..';
import MyInput from '../forms/MyInput';
import styles from '../styles/components/Header.module.scss';

const Header = observer(({search, onSearch, onclick}) => {
  const navigate = useNavigate();
  const {user} = useContext(Context);
  const [searchVisible, setSearchVisible] = useState(false);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false)
  const userMenu = []

  useEffect(()=>{
    w()
  }, [])

  //set visibility searc and phone from screen width
  const w = () => {
    let width = window.innerWidth;
    if (width > 767) {
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

  const onCloseVisible = () => {
    let width = window.innerWidth;
    if (width <= 767) {
      if (searchVisible) {onSearchVisible(searchVisible)};
      if (phoneVisible) {onPhoneVisible(phoneVisible)};
    }
    setCloseMenu(true);
    setTimeout(()=>{
      setCloseMenu(false)
    }, 200)
  }

  //configure userMenu depending on authorization and userRole
  if (user.isAuth) {
    userMenu.push(
      { id: 2,
        route: PROFILE_ROUTE,
        name: "Профиль"},
      { id: 3,
        route: HOME_ROUTE,
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

  //logOut
  function setKey(item) {
    if (item.id === 3) {
      logOut()
    }
  }

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setName({})
    user.setRole({})
    user.setId({})
    localStorage.removeItem('token')
  }

  return (
    <div className={styles.header}>
      <div className={styles.wrapper} onClick={() => onCloseVisible()} >
        <div className={styles.logo} onClick={() => {navigate(HOME_ROUTE); onclick(-1); onSearch('')}}></div>
        <div className={styles.menu}>
          <div className={styles.menu__icon}>
            <div className={styles.icon + ' ' + styles.search} onClick={() => onSearchVisible(searchVisible) } ></div>
          </div>
          {searchVisible &&
            <div className={styles.menu__input} onClick={(e) => e.stopPropagation()}>
              <MyInput name='search' type='text' value={search} placeholder='Поиск по названию'
              onChange={e => onSearch(e.target.value)} />
            </div>
          }
        </div>  
        <div className={styles.menu}>
          <div className={styles.menu__icon}>
            <div className={styles.icon + ' ' + styles.phone} onClick={() => onPhoneVisible(phoneVisible)} ></div>
          </div>
          {phoneVisible &&
            <div className={styles.menu__input}>
              <div className={styles.menu__title}>Наши контакты</div>
              {phone.map(item => 
                <div className={styles.menu__item} key={item.id} onClick={()=>setPhoneVisible(false)} >{item.info}</div>
              )}
            </div>
          }
        </div>  
        <div className={styles.user}>
          <div className={styles.box}>
            <div className={styles.icon + ' ' + styles.basket} onClick={() => navigate (BASKET_ROUTE)}></div>
            {localStorage.getItem('basketDevices') && localStorage.getItem('basketDevices') && JSON.parse(localStorage.getItem('basketDevices')).length !== 0 &&
              <div className={styles.numberbasket}>{JSON.parse(localStorage.getItem('basketDevices')).length}</div>
            }
          </div>
          <div className={styles.box}>
            <MyMenu menu={userMenu} isAuth={user.isAuth} click={setKey} close={closeMenu} />
            {user.isAuth && <div className={styles.messageUser}>{user.name}</div>}
          </div>
          
        </div>
      </div>
    </div>
  );
});
export default Header;