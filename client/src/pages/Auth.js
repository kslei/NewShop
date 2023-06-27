import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import MyInput from '../forms/MyInput';
import MyButton from '../forms/MyButton';
import styles from '../styles/pages/Auth.module.scss';

const Auth = observer(({ setErrorMessage }) => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  //validation states
  const [emailError, setEmailError] = useState('email не может быть пустым')
  const [passwordError, setPasswordError] = useState('password не может быть пустым')
  const [nameError, setNameError] = useState('Имя не может быть пустым')
  const [phoneError, setPhoneError] = useState('Телефон не может быть пустым')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [phoneDirty, setPhoneDirty] = useState(false)
  //disabled button reg/log
  const [disabled, setDisabled] = useState(false)

  useEffect(()=>{
    if(emailError || passwordError || !isLogin&&(nameError || phoneError)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [emailError, passwordError, nameError, phoneError, isLogin])
  
  //onblur event handling
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
      case 'phone':
        setPhoneDirty(true)
        break
    }
  }

  //validation form
  const inputHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase()) && String(e.target.value).length !==0) {
          setEmailError('Некорректный email')
        } else {
          setEmailError('')
        }
        if (String(e.target.value).length === 0) setEmailError(`Поле "${e.target.name}" не может быть пустым`)
        break
      case 'password':
        setPassword(e.target.value)
        const rp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
        if (!rp.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setPasswordError('Некорректный password')
        } else {
          setPasswordError('')
        }
        if (String(e.target.value).length === 0) setPasswordError(`Поле "${e.target.name}" не может быть пустым`)
      break
      case 'name':
        setName(e.target.value)
        if (String(e.target.value).length > 1 && String(e.target.value).length <= 10) {
          setNameError('')
        } else {
          setNameError('Некорректное имя')
        }
        if (String(e.target.value).length === 0) setNameError(`Поле "${e.target.name}" не может быть пустым`)
      break
      case 'phone':
        setPhone(e.target.value)
        const rph = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/
        if (!rph.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setPhoneError('Некорректный номер телефона')
        } else {
          setPhoneError('')
        }
        if (String(e.target.value).length === 0) setPhoneError(`Поле "${e.target.name}" не может быть пустым`)
      break
    }
  }

  //server validate errors
  const serverValidationHandler = (e) => {
    switch(e.path) {
      case 'name':
        setNameError(e.msg)
      break
      case 'email':
        setEmailError(e.msg)
      break
      case 'password':
        setPasswordError(e.msg)
      break
      case 'phone':
        setPhoneError(e.msg)
      break
      case 'role':
        alert(e.msg)
      break
    }
  }
  //click button login/registration
  const click = async () => {
    try {
      var data;
      var role;
      
      if (isLogin) {
        data = await login(email, password)
      } else {
        /* if (password.toLowerCase().includes('fh1636dy')) {
          role = 'ADMIN';
        } else {
          role = 'USER'
        } */
        role = 'USER'
        data = await registration(email, password, role, name, phone)
      }

      user.setUser(true)
      user.setIsAuth(true)
      user.setName(data.name)
      user.setEmail(data.email)
      user.setRole(data.role)
      user.setId(data.id)

      navigate(HOME_ROUTE)

      setEmail('')
      setPassword('')
      setPhone('')
      setName('')
    } catch (e) {//errors heandler
      if(e.response.data.message) setMessage(e.response.data.message)
      if(e.response.data.errors) {
        setErrorMessage(e)
        e.response.data.errors.map(error => {
        serverValidationHandler(error)
        })
      }
    }
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {message &&
          <div className={styles.danger}>
            <span className={styles.danger__text}>{message}</span>
            <MyButton name={"OK"} danger={true} onClick={() => setMessage('')}/>
          </div>
        }
        <div className={styles.card}>
          <h2 className={styles.card__text}>{isLogin ? 'Авторизация' : "Регистрация"}</h2>
          <div className={styles.form}>
            <div className={styles.form__error}>
              {(emailDirty && emailError) && <div>{emailError}</div>}
            </div>
            <MyInput
              onBlur={e => blurHandler(e)}
              name='email'
              type='text'
              placeholder="Введите email"
              value={email}
              onChange={e => inputHandler(e)}
            />
            <div className={styles.form__error}>
              {(passwordDirty && passwordError) ? <div>{passwordError}</div>:<div className={styles.form__hint}>Пароль не менее 8 символов: заглавные, строчные буквы и цифры</div>}
            </div>
            <form>
              <MyInput
              onBlur={e => blurHandler(e)}
              name='password'
              type='password'
              placeholder="Введите пароль"
              value={password}
              onChange={e => inputHandler(e)}
              autoComplete='on'
            />
            </form>
            
            {!isLogin &&
              <div>
                <div className={styles.form__error}>
                  {(nameDirty && nameError) ? <div>{nameError}</div> : <div className={styles.form__hint}>Имя должно быть не менее 2 и не более 10 символов</div>}
                </div>
                <MyInput
                  onBlur={e => blurHandler(e)}
                  name='name'
                  type='text'
                  placeholder="Введите имя"
                  value={name}
                  onChange={e => inputHandler(e)}
                />
                <div className={styles.form__error}>
                  {(phoneDirty && phoneError) ? <div>{phoneError}</div> : <div className={styles.form__hint}>Телефон в формате "+ код страны   код оператора   номер"</div>}
                </div>
                <MyInput
                  onBlur={e => blurHandler(e)}
                  name='phone'
                  type='text'
                  placeholder="Введите телефон"
                  value={phone}
                  onChange={e => inputHandler(e)}
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
              <div className={styles.button}>
                <MyButton name={"Выйти"} danger={true} onClick={() => navigate(HOME_ROUTE)} />
                <MyButton name={isLogin ? "Войти" : "Регистрация"} onClick={click} disabled={disabled}></MyButton>
              </div>  
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Auth;