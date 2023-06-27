import React from 'react';
import MyButton from '../forms/MyButton';
import styles from '../styles/components/DeviceMedia.module.scss';

const DeviceMedia = ({device, type, create, update, select}) => {
  
  return (
    <div className={styles.media__type}>
      {type === 'frame'
        ?<div className={styles.media__title}>Кадры</div>
        :<div className={styles.media__title}>Картинки</div>
      }
      <div className={styles.media__columnName}>
        <div>id</div>
        <div>Файл</div>
        <div>Выбор файла</div>
        <div>Действие</div>
      </div>
      <div className={styles.frameItem}>
        <div></div>
        <div className={styles.frameItem__id} >Нет файла?</div>
        <input type='file' onChange={(e) => select(e)} accept='image/jpeg, image/png'/>
        <MyButton sm={true} danger={true} name={'Добавить'} onClick={() => create()} />
      </div>
      {device.map(image =>
        <div className={styles.frameItem} key={image.id}>
          <div className={styles.frameItem__id}>{image.id}</div>
          {type === 'frame'
          ? <div className={styles.frameItem__id}>{image.frame}</div>
          : <div className={styles.frameItem__id}>{image.img}</div>
          }          
          <input type='file' onChange={(e) => select(e)} accept='image/jpeg, image/png' />
          <MyButton sm={true} danger={true} name={'Изменить'} onClick={() => update(image.id)} />
        </div>
      )}
    </div>
  );
};
export default DeviceMedia;