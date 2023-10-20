import React, {useState, useEffect} from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import { addLocale } from '../../utils/functions';
import {createType} from '../../http/deviceAPI';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/MyModal.module.scss';

const CreateType = ({show, onHide}) => {
  const { t } = useTranslation()//Internationalization
  const [value, setValue] = useState('');
  const [valueRu, setValueRu] = useState('');
  const [valueUk, setValueUk] = useState('');
  const [file, setFile] = useState(null);
  //validation states
  const [nameError, setNameError] = useState(`${t("Name") + " " + t("cannot be empty")}`)
  const [fileError, setFileError] = useState(`${t("File") + " " + t("cannot be empty")}`)
  const [nameDirty, setNameDirty] = useState(false)
  const [fileDirty, setFileDirty] = useState(false)
  //disabled add button 
  const [disabled, setDisabled] = useState(false)
  
  
  useEffect(() => {
    if (nameError || fileError) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [nameError, fileError])

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
      case 'file':
        setFile(e.target.files[0])
        console.log(e.target.files[0].type)
        if (String(e.target.files[0].type) === 'image/jpeg') {
          setFileError('')
        } else {
          setFileError(`${t("Incorrect", {context: "male"}) + " " + t("Type").toLowerCase() + " " + t("of file")}`)
        }
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
      case 'file':
        setFileDirty(true)
      break
      default: return;
    }
  }

  //add type function
  const addType = () => {
    const formData = new FormData()
    formData.append('name', value)
    formData.append('img', file)
    createType(formData)
    .then(data =>  {
      addLocale(value, value, valueRu, valueUk);
      setValue(''); setValueRu(''); setValueUk('');
      setFile(null);
      onHide() }
    )
    .catch(e => setNameError(e.response.data.message));
  }

  //do not show
  if (!show) {
    return null
  }

  //show
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>{t("Add") + " " + t("Type").toLowerCase()}</div>
      <div className={styles.modal__body}>
        <div className={styles.form__error}>
          {(nameDirty && nameError) ? <div>{nameError}</div> : <div className={styles.form__hint}>{t("name_rule_1")}</div>}
        </div>
        <MyInput name='name' value={value} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Type").toLowerCase() + " " + t("in English")} />
        <MyInput name='ru' value={valueRu} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Type").toLowerCase() + " " + t("in Russian")} />
        <MyInput name='uk' value={valueUk} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder={t("Enter") + " " + t("Type").toLowerCase() + " " + t("in Ukrainian")} />
        <div className={styles.form__error}>
          {(fileDirty && fileError) ? <div>{fileError}</div> : <div className={styles.form__hint}>{t("Type") + " " + t("of file")}: ".jpeg, .jpg"</div>}
        </div>
        <MyInput name='file' type='file' onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} accept='image/jpeg' />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={t("Cancel")} danger={true} onClick={onHide}></MyButton>
        <MyButton name={t("Add")} onClick={addType} disabled={disabled}></MyButton>
      </div>
    </div>
  );
};
export default CreateType;