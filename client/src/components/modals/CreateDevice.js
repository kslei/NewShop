import React, { useContext, useEffect, useState } from 'react';
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI';
import { Context } from '../../index';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import MyMenu from '../../forms/MyMenu';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/components/MyModal.module.scss';



const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context);
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  const [typeDanger, setTypeDanger] = useState (false)
  const [brandDanger, setBrandDanger] = useState(false)
  
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number===number?{...i,[key]:value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0]) 
  }

  const addDevice = () => {
    const formData = new FormData ()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data=>onHide())
  }

  const setType = (type) => {
    device.setSelectedType(type);
    setTypeDanger(true)
    setTimeout(() => {
      setTypeDanger(false)
    }, 1000);
  }

  const setBrand = (brand) => {
    device.setSelectedBrand(brand)
    setBrandDanger(true)
    setTimeout(() => {
      setBrandDanger(false)
    }, 1000);
  }

  if (!show) {
    return null
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>Добавить устройство</div>
      <div className={styles.modal__body}>
        <MyMenu name={'Выберите тип'} menu={device.types} click={setType} danger={typeDanger}/>
        <MyMenu name={'Выберите бренд'} menu={device.brands} click={setBrand} danger={brandDanger}/>
        <MyInput type='text' value={name} onChange={e=>setName(e.target.value)} placeholder="Введите название устройства" />
        <MyInput value={price} onChange={e => setPrice(e.target.value)} placeholder="Введите цену устройства" />
        <MyInput type='file' onChange={selectFile} />
        
        {info.map(i => 
        <div className={styles.info} key={i.number}>
          <div className={styles.info__title}>
            <MyInput type='text' value={i.title} onChange={(e)=>changeInfo('title', e.target.value, i.number)} placeholder="Введите название свойства"/>
          </div>
          <div className={styles.info__description}>
            <MyInput type='text' value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} placeholder="Введите описание свойства" />
          </div>
          <div className={styles.info__remove}>
            <MyButton name={"Удалить"} danger={true} onClick={()=>removeInfo(i.number)} />
          </div>
         </div>  
        )}
        <MyButton name={'Добавить новое свойство'} danger={true} onClick={addInfo} />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
        <MyButton name={'Добавить'} onClick={addDevice}></MyButton>
        
      </div>
    </div> 
  );
});
export default CreateDevice;