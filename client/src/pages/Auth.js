import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import MyInput from '../forms/MyInput';
import MyButton from '../forms/MyButton';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/Auth.module.scss';

const Auth = observer(({ setErrorMessage }) => {
  //multilanguage
  const { t } = useTranslation()

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
  const [emailError, setEmailError] = useState(`email ${t("cannot be empty")}`)
  const [passwordError, setPasswordError] = useState(`password ${t("cannot be empty")}`)
  const [nameError, setNameError] = useState(`${t("Name")} ${t("cannot be empty")}`)
  const [phoneError, setPhoneError] = useState(`${t("Phone")} ${t("cannot be empty")}`)
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
          setEmailError(`${t("Incorrect_male")} email`)
        } else {
          setEmailError('')
        }
        if (String(e.target.value).length === 0) setEmailError(`${t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
        break
      case 'password':
        setPassword(e.target.value)
        const rp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
        if (!rp.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setPasswordError(`${t("Incorrect_male")} password`)
        } else {
          setPasswordError('')
        }
        if (String(e.target.value).length === 0) setPasswordError(`${t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
      break
      case 'name':
        setName(e.target.value)
        if (String(e.target.value).length > 1 && String(e.target.value).length <= 10) {
          setNameError('')
        } else {
          setNameError(`${t("Incorrect")} ${t("Name").toLowerCase()}`)
        }
        if (String(e.target.value).length === 0) setNameError(`${t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
      break
      case 'phone':
        setPhone(e.target.value)
        const rph = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/
        if (!rph.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setPhoneError(`${t("Incorrect_male")} ${t("Phone").toLowerCase()}`)
        } else {
          setPhoneError('')
        }
        if (String(e.target.value).length === 0) setPhoneError(`${t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
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
          <h2 className={styles.card__text}>{isLogin ? t("Authorization") : t("Registration")}</h2>
          <div className={styles.form}>
            <div className={styles.form__error}>
              {(emailDirty && emailError) && <div>{emailError}</div>}
            </div>
            <MyInput
              onBlur={e => blurHandler(e)}
              name='email'
              type='text'
              placeholder={t("Enter")+" Email"}
              value={email}
              onChange={e => inputHandler(e)}
            />
            <div className={styles.form__error}>
              {(passwordDirty && passwordError) ? <div>{passwordError}</div>:<div className={styles.form__hint}>{t("password_rule")}</div>}
            </div>
            <form>
              <MyInput
              onBlur={e => blurHandler(e)}
              name='password'
              type='password'
              placeholder={t("Enter") + " " + t("password")}
              value={password}
              onChange={e => inputHandler(e)}
              autoComplete='on'
            />
            </form>
            
            {!isLogin &&
              <div>
                <div className={styles.form__error}>
                  {(nameDirty && nameError) ? <div>{nameError}</div> : <div className={styles.form__hint}>{t("name_rule")}</div>}
                </div>
                <MyInput
                  onBlur={e => blurHandler(e)}
                  name='name'
                  type='text'
                  placeholder={t("Enter") + " " + t("name")}
                  value={name}
                  onChange={e => inputHandler(e)}
                />
                <div className={styles.form__error}>
                  {(phoneDirty && phoneError) ? <div>{phoneError}</div> : <div className={styles.form__hint}>{t("phone_rule")}</div>}
                </div>
                <MyInput
                  onBlur={e => blurHandler(e)}
                  name='phone'
                  type='text'
                  placeholder={t("Enter") + " " + t("phone")}
                  value={phone}
                  onChange={e => inputHandler(e)}
                />
              </div>
            }
            <div className={styles.row}>
              {isLogin ?
                <div className={styles.quest}>
                  {t("No_account?")}<NavLink className={styles.link} to={REGISTRATION_ROUTE}>{t("Sign_up")}</NavLink>
                </div>
                :
                <div className={styles.quest}>
                  {t("Have_an_account?")} <NavLink className={styles.link} to={LOGIN_ROUTE}>{t("Login")}</NavLink>
                </div>}
              <div className={styles.button}>
                <MyButton name={t("Cancel")} danger={true} onClick={() => navigate(HOME_ROUTE)} />
                <MyButton name={isLogin ? t("Sign_in") : t("Registration")} onClick={click} disabled={disabled}></MyButton>
              </div>  
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Auth;