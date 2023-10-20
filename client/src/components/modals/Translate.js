import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/components/MyModal.module.scss'
import { fetchLocale, updateLocale } from '../../http/languageAPI';
import MyInput from '../../forms/MyInput';
import { useTranslation } from 'react-i18next';
import MyButton from '../../forms/MyButton';

const Translate = observer(({show, onHide, info}) => {
  const { t } = useTranslation()//Internationalization
  const [en, setEn] = useState([])
  const [ru, setRu] = useState([])
  const [uk, setUk] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState('')
    
  useEffect(()=>{
    if(show) {
      setLocale("en")
      setLocale("ru")
      setLocale("uk")
    }
    
  }, [show])

  useEffect(() => {
    isDisabled()
  }, [en, ru, uk])


  const setLocale = (lng) => {
    let loc = info.map(i => {
      return [i.title, i.description]
    })
    
    let keys = loc.flat().filter(el => (/[a-zA-Z]/.test(el))) //make an object into an array of keys
    fetchLocale(lng, keys).then(data => {
      switch (lng) {
        case 'en':
          let loc = data.filter(el => el.value === "")
          loc.map(el => el.value = el.key)
          setEn(loc)
        break
        case 'ru':
          setRu(data.filter(el => el.value === ""))
        break
        case 'uk':
          setUk(data.filter(el => el.value === ""))
        break
        default: return;
      }
    })
  }

  const changeLocale = (lng, key, value) => {
    switch (lng) {
      case 'en':
        setEn(en.map(el=>el.key === key? {key, value} : el))
      break
      case 'ru':
        setRu(ru.map(el=>el.key === key? {key, value} : el))
      break
      case 'uk':
        setUk(uk.map(el=>el.key === key? {key, value} : el))
      break
    }
  }
  
  const isDisabled = () => {
    let endis = en.findIndex(el => el.value === "")
    let rudis = ru.findIndex(el => el.value === "")
    let ukdis = uk.findIndex(el => el.value === "")
    if (endis === -1 && rudis === -1 && ukdis === -1) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const update = () => {
    en.forEach(el => {
      try {
        updateLocale("en", el.key, el.value).then(data => console.log(data))
      } catch (e) {
        setMessage(e.response.data.message)
      }
      
    })
    ru.forEach(el => {
      try {
        updateLocale("ru", el.key, el.value).then(data => console.log(data))
      } catch (e) {
        setMessage(e.response.data.message)
      }
    })
    uk.forEach(el =>{
      try {
        updateLocale("uk", el.key, el.value).then(data => console.log(data))
      } catch (e) {
        setMessage(e.response.data.message)
      }
    })
    onHide()
  }

  if (!show) {
    return null
  }
  return (
  <div className={styles.modal__language} >
    <span>{t("Enter")+" "+t("translation value")}</span>
    <div className={styles.modal__language_row}>
      <div className={styles.modal__language_column}>
        <div className={styles.modal__language_title}>key</div>
        {en.map(i =>
          <MyInput key={i.key} value={i.key} placeholder="input key" disabled={true}/>
        )}
      </div>
      <div className={styles.modal__language_column}>
        <div className={styles.modal__language_title}>{t("in English")}</div>
        {en.map(i =>
          <MyInput key={i.key} value={i.value} placeholder="input value" onChange={(e) => changeLocale('en', i.key, e.target.value)} />
        )}
      </div>
      <div className={styles.modal__language_column}>
        <div className={styles.modal__language_title}>{t("in Russian")}</div>
        {ru.map(i =>
          <MyInput key={i.key} value={i.value} placeholder="input value" onChange={(e) => changeLocale('ru', i.key, e.target.value)} />
        )}
      </div>
      <div className={styles.modal__language_column}>
        <div className={styles.modal__language_title}>{t("in Ukrainian")}</div>
        {uk.map(i =>
          <MyInput key={i.key} value={i.value} placeholder="input value" onChange={(e) => changeLocale('uk', i.key, e.target.value)} />
        )}
      </div>
    </div>
    <MyButton name={t("Add")} disabled={disabled} onClick={() => update()}/>
    <div>{message}</div>
    {message !== "" && <MyButton name="OK" onClick={() => setMessage('')}/>}
  </div>
  );
});
export default Translate;