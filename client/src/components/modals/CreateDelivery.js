import React, { useState } from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import { createDelivery } from '../../http/deliveryAPI';
import styles from '../../styles/components/MyModal.module.scss';

const CreateDelivery = ({ show, onHide, setErrorMessage }) => {
  const [value, setValue] = useState('');

  //add delivery function
  const addDelivery = () => {
    createDelivery({ name: value }).then(data => setValue('')).catch(e => setErrorMessage(e));
    onHide();
  }

  //do not show
  if (!show) {
    return null
  }

  //show
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>Добавить тип</div>
      <div className={styles.modal__body}>
        <MyInput value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название доставки' />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
        <MyButton name={'Добавить'} onClick={addDelivery}></MyButton>
      </div>
    </div>
  );
};
export default CreateDelivery;