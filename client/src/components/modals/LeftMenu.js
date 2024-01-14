import React, { useState } from 'react';
import MyButton from '../../forms/MyButton';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/LeftMenu.module.scss';
import { fetchFile } from '../../http/fileAPI';
import LoadAnimate from '../LoadAnimate';

const LeftMenu = () => {
  const {t} = useTranslation()
  const [translate, setTranslate] = useState(Number(sessionStorage.getItem('translate')) || 0)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  console.log(error)
  const fileName = 'newshop'
  const downloadFile = () => {
    setMessage('Loading')
    fetchFile().then(res => {
      const type = res.headers["content-type"];
      let blob = new Blob([res.data], { type: type });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      setMessage('')
      sessionStorage.setItem('translate', '230')
    }).catch(e => setError(e.message))
  }
  const onTranslate = () => {
    if(translate === 0) {
      setTranslate(230)
      sessionStorage.setItem('translate', '230')
    } else {
      setTranslate(0)
      sessionStorage.setItem('translate', '0')
    }
  }

  return (
  <div className={styles.menu} style={{transform: `translateX(-${translate}px)`}}>
    
    <div className={styles.menu__content}>
      
      {error?
        <div className={styles.menu__title} style={{color: 'red'}}>{error}</div>
        :<div className={styles.menu__title}>{t('You can install the android app')}</div>
      }
      {message?
        <div className={styles.menu__download}>
          <div className={styles.menu__image}></div>
          <LoadAnimate message={'LOADING'} />
        </div>
        :<div className={styles.menu__download}>
          <div className={styles.menu__image}></div>
          {error?
            <MyButton danger={true} name={'OK'} onClick={() => setError('')}/>
            :<MyButton name={t('Download')} onClick={() => downloadFile()}/>
          }
        </div>
      }
    </div>
    {translate === 0 ?
      <div className={styles.menu__btn_left} onClick={() => onTranslate()}></div>
      : <div className={styles.menu__btn_right} onClick={() => onTranslate()}></div>
    }
  </div>
  );
};
export default LeftMenu;