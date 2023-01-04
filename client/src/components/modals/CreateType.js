import React, {useState} from 'react';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import {createType} from '../../http/deviceAPI';
import styles from '../../styles/components/MyModal.module.scss';

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  
  const addType = () => {
    const formData = new FormData()
    formData.append('name', value)
    formData.append('img', file)
    createType(formData).then(data => setValue(''));
    onHide();
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  if (!show) {
    return null
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>Добавить тип</div>
      <div className={styles.modal__body}>
        <MyInput value={value} onChange={e => setValue(e.target.value)} placeholder='Введите название типа' />
        <MyInput type='file' onChange={selectFile} />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
        <MyButton name={'Добавить'} onClick={addType}></MyButton>
      </div>
    </div>
  );
};
export default CreateType;