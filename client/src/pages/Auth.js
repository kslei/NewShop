import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
//import { fetchBasketId } from '../http/basketAPI';
import styles from '../styles/pages/Auth.module.scss';
import MyInput from '../forms/MyInput';
import MyButton from '../forms/MyButton';

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  /* console.log(location) */
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  

  const click = async () => {
    try {
      var data;
      var role;
      if (isLogin) {
        data = await login(email, password)
      } else {
        if (password.toLowerCase().includes('admin')) {
          role = 'ADMIN';
        } else {
          role = 'USER'
        }
        data = await registration(email, password, role, name, phone)
      }

      user.setUser(true)
      user.setIsAuth(true)
      user.setRole(data.role)
      user.setId(data.id)

      navigate(SHOP_ROUTE)
      //document.location.reload();
    } catch (e) {
      alert(e.response.data.message)
    }
    setEmail('')
    setPassword('')
    setPhone('')
    setName('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.card__text}>{isLogin ? 'Авторизация' : "Регистрация"}</h2>
          <div className={styles.form}>
            <MyInput
              type='text'
              placeholder="Введите email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <MyInput
              type='password'
              placeholder="Введите пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {!isLogin &&
              <div>
                <MyInput
                  type='text'
                  placeholder="Введите имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <MyInput
                  type='text'
                  placeholder="Введите телефон"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            }
            <div className={styles.row}>
              {isLogin ?
                <div className={styles.quest}>
                  Нет аккаунта? <NavLink className={styles.link} to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                </div>
                :
                <div className={styles.quest}>
                  Есть аккаунт? <NavLink className={styles.link} to={LOGIN_ROUTE}>Войдите</NavLink>
                </div>}
              <MyButton name={isLogin ? "Войти" : "Регистрация"} onClick={click}
                >
                
              </MyButton>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
})

export default Auth;