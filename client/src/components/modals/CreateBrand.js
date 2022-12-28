import React, { useState } from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import { createBrand } from '../../http/deviceAPI';
import styles from '../../styles/components/MyModal.module.scss';

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const addBrand = () => {
    createBrand({name: value}).then(data=>setValue(''));
    onHide();
  }
  if (!show) {
    return null
  }
  return (
  <div className={styles.modal}>
    <div className={styles.modal__header}>Добавить бренд</div>
    <div className={styles.modal__body}>
      <MyInput value={value} onChange = {e => setValue(e.target.value)} placeholder='Введите название бренда'/>
    </div>
    <div className={styles.modal__futor}>
      <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
      <MyButton name={'Добавить'} onClick={addBrand}></MyButton>
    </div>
  </div>
  );
};
export default CreateBrand;