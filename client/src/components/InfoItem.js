import React, { useState, useEffect } from 'react';
import MyButton from '../forms/MyButton';
import MyInput from '../forms/MyInput';
import { fetchLocale } from '../http/languageAPI';
import { addLocale } from '../utils/functions';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/InfoItem.module.scss';

const InfoItem = ({ info, add }) => {
  const { t } = useTranslation()
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [titleRu, setTitleRu] = useState('')
  const [titleUk, setTitleUk] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [descriptionRu, setDescriptionRu] = useState('')
  const [descriptionUk, setDescriptionUk] = useState('')
  
  useEffect(() => {
    setTitleValue(info.title)
    setDescriptionValue(info.description)
    fetchLocale("en", [info.title, info.description]).then(data => {setTitleEn(data[0].value); setDescriptionEn(data[1].value)})
    fetchLocale("ru", [info.title, info.description]).then(data => { setTitleRu(data[0].value); setDescriptionRu(data[1].value) })
    fetchLocale("uk", [info.title, info.description]).then(data => { setTitleUk(data[0].value); setDescriptionUk(data[1].value) })
  }, [])



  let infoObj = {
    id: info.id,
    title: titleValue,
    description: descriptionValue
  }

  const update = () => {
    add(infoObj);
    addLocale(titleValue, titleEn, titleRu, titleUk)
    if (/[a-zA-Z]/.test(descriptionValue)) {
      addLocale(descriptionValue, descriptionEn, descriptionRu, descriptionUk)
    }
  }

  return (
    <div className={styles.infoItem}>
      <div className={styles.infoId}>{info.id}</div>
      <MyInput type='text' sm={"true"} value={titleValue} onChange={event => setTitleValue(event.target.value)} />
      <MyInput type='text' sm={"true"} value={titleEn} onChange={e => setTitleEn(e.target.value)} />
      <MyInput type='text' sm={"true"} value={titleRu} onChange={e => setTitleRu(e.target.value)} />
      <MyInput type='text' sm={"true"} value={titleUk} onChange={e => setTitleUk(e.target.value)} />
      <MyInput type='text' sm={"true"} value={descriptionValue} onChange={event => setDescriptionValue(event.target.value)} />
      <MyInput type='text' sm={"true"} value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} />
      <MyInput type='text' sm={"true"} value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)} />
      <MyInput type='text' sm={"true"} value={descriptionUk} onChange={e => setDescriptionUk(e.target.value)} />
      <MyButton name={t("Update")} danger={true}  sm={true} onClick={() => update()} />
    </div>
  );
};
export default InfoItem;