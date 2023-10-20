import React, { useState, useEffect } from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import { createDelivery } from '../../http/deliveryAPI';
import { useTranslation } from 'react-i18next';
import { addLocale } from '../../utils/functions';
import styles from '../../styles/components/MyModal.module.scss';

const CreateDelivery = ({ show, onHide, setErrorMessage }) => {
  const { t } = useTranslation()//Internationalization
  const [value, setValue] = useState('');
  const [valueRu, setValueRu] = useState('');
  const [valueUk, setValueUk] = useState('');
  //validation states
  const [nameError, setNameError] = useState(`${t("Name") + " " + t("cannot be empty")}`)
  const [nameDirty, setNameDirty] = useState(false)
  //disabled add button 
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (nameError) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [nameError])

  //validation forms
  const inputHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setValue(e.target.value)
        if (String(e.target.value).length > 1) {
          setNameError('')
        } else {
          setNameError(`${t("Incorrect") + " " + t("Name").toLowerCase()}`)
        }
        if (String(e.target.value).length === 0) setNameError(`${t("The") + " " + t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
        break
      case 'ru':
        setValueRu(e.target.value)
        if (String(e.target.value).length > 1) {
          setNameError('')
        } else {
          setNameError(`${t("Incorrect") + " " + t("Name").toLowerCase()}`)
        }
        if (String(e.target.value).length === 0) setNameError(`${t("The") + " " + t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
        break
      case 'uk':
        setValueUk(e.target.value)
        if (String(e.target.value).length > 1) {
          setNameError('')
        } else {
          setNameError(`${t("Incorrect") + " " + t("Name").toLowerCase()}`)
        }
        if (String(e.target.value).length === 0) setNameError(`${t("The") + " " + t("Field")} "${e.target.name}" ${t("cannot be empty")}`)
        break
      default: return
    }
  }

  //onblur event handling
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'ru':
        setNameDirty(true)
        break
      case 'uk':
        setNameDirty(true)
        break
      default: return;
    }
  }

  //add delivery function
  const addDelivery = () => {
    createDelivery({ name: value }).then(data => {
      addLocale(value, value, valueRu, valueUk)
      setValue(''); setValueRu(''); setValueUk('');
      onHide();    
    }).catch(e => setErrorMessage(e));

  }

  //do not show
  if (!show) {
    return null
  }

  //show
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>{t("Add") + " " + t("Delivery_1").toLowerCase()}</div>
      <div className={styles.modal__body}>
        <div className={styles.form__error}>
          {(nameDirty && nameError) ? <div>{nameError}</div> : <div className={styles.form__hint}>{t("name_rule_1")}</div>}
        </div>
        <MyInput name='name' value={value} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Name_1").toLowerCase() + " " + t("Delivery_2").toLowerCase() + " " + t("in English")} />
        <MyInput name='ru' value={valueRu} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Name_1").toLowerCase() + " " + t("Delivery_2").toLowerCase() + " " + t("in Russian")} />
        <MyInput name='uk' value={valueUk} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Name_1").toLowerCase() + " " + t("Delivery_2").toLowerCase() + " " + t("in Ukrainian")} />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={t("Cancel")} danger={true} onClick={onHide}></MyButton>
        <MyButton name={t("Add")} onClick={addDelivery} disabled={disabled}></MyButton>
      </div>
    </div>
  );
};
export default CreateDelivery;