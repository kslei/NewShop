import React, {useState} from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import {createType} from '../../http/deviceAPI';
import styles from '../../styles/components/MyModal.module.scss';


const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const addType = () => {
    createType({ name: value }).then(data => setValue(''));
    onHide();
  }
  if (!show) {
    return null
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>Добавить тип</div>
      <div className={styles.modal__body}>
        <MyInput value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название типа' />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
        <MyButton name={'Добавить'} onClick={addType}></MyButton>
      </div>
    </div>
  );
};
export default CreateType;