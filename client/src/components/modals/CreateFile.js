import React, { useState, useEffect } from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import { createFile } from '../../http/fileAPI'; 
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/MyModal.module.scss';


const CreateFile = ({ show, onHide }) => {
  const { t } = useTranslation()//Internationalization
  const [file, setFile] = useState(null);
  //validation states
  const [fileError, setFileError] = useState(`${t("File") + " " + t("cannot be empty")}`)
  const [fileDirty, setFileDirty] = useState(false)
  //disabled add button 
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (fileError) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [fileError])

  //validation forms
  const inputHandler = (e) => {
    switch (e.target.name) {
      case 'file':
        setFile(e.target.files[0])
        if (String(e.target.files[0].type) === 'application/vnd.android.package-archive') {
          setFileError('')
        } else {
          setFileError(`${t("Incorrect", { context: "male" }) + " " + t("Type").toLowerCase() + " " + t("of file")}`)
        }
        break
    }
  }

  //onblur event handling
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'file':
        setFileDirty(true)
        break
    }
  }

  //add file function
  const addFile = () => {
    const formData = new FormData()
    formData.append('file', file)
    createFile(formData)
      .then(data => { setFile(null); onHide() })
      .catch(e => console.log(e.response.data.message));
  }
  //do not show
  if (!show) {
    return null
  }

  //show
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>{t("Add") + " " + t("File").toLowerCase()}</div>
      <div className={styles.modal__body}>
        <div className={styles.form__error}>
          {(fileDirty && fileError) ? <div>{fileError}</div> : <div className={styles.form__hint}>{t("Type") + " " + t("of file")}: ".apk"</div>}
        </div>
        <MyInput name='file' type='file' onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} accept='application/vnd.android.package-archive' />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={t("Cancel")} danger={true} onClick={onHide}></MyButton>
        <MyButton name={t("Add")} onClick={addFile} disabled={disabled}></MyButton>
      </div>
    </div>
  );
};
export default CreateFile;