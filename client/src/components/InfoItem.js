import React, { useState, useEffect } from 'react';
import MyButton from '../forms/MyButton';
import MyInput from '../forms/MyInput';
import styles from '../styles/components/InfoItem.module.scss';

const InfoItem = ({ info, add }) => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  useEffect(() => {
    setTitleValue(info.title)
    setDescriptionValue(info.description)
  }, [])

  let infoObj = {
    id: info.id,
    title: titleValue,
    description: descriptionValue
  }

  //console.log("infoObj", infoObj)



  return (
    <div className={styles.infoItem}>
      <div className={styles.infoId}>{info.id}</div>
      <MyInput type='text' sm={"true"} value={titleValue} onChange={event => setTitleValue(event.target.value)} />
      <MyInput type='text' sm={"true"} value={descriptionValue} onChange={event => setDescriptionValue(event.target.value)} />
      <MyButton name={'Обновить'} danger={true}  sm={true} onClick={() => add(infoObj)} />
    </div>
  );
};
export default InfoItem;