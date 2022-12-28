import React, { useEffect, useState } from 'react';
import InfoItem from './InfoItem';
import MyInput from '../forms/MyInput';
import MyButton from '../forms/MyButton';
import MyMenu from '../forms/MyMenu';
import FileInput from '../forms/FileInput';
import { fetchOneDevice, updateDevice, createInfo } from '../http/deviceAPI';
import styles from '../styles/components/AdminDevice.module.scss';

const AdminDevice = ({device, brands, types, onNote}) => {
  const [name, setName] = useState(device.name)
  const [price, setPrice] = useState(device.price)
  const [type, setType] = useState(device.type)
  const [brand, setBrand] = useState(device.brand)
  //const [number, setNumber] = useState(device.number)
  const [info, setInfo] = useState([])
  const [file, setFile] = useState(null)
  const [infoVisible, setInfoVisible] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  //console.log(file)
  useEffect(() => {
    fetchOneDevice(device.id).then(data => { setInfo(data.info)})
  }, [])

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const onBrand = (brand) => {
    setBrand(brand)
  }

  const onType = (type) => {
    setType(type)
  }
  const onInfoVisible = (infoVisible) => {
    setInfoVisible(!infoVisible)
  }
  const addInfo = (infoObject) => {
    info.map(item => {
      if(item.id === infoObject.id) {
        item.title = infoObject.title;
        item.description = infoObject.description;
      }
    })
    setInfo(info)
  }
  
  const update = () => {
    const formData = new FormData()
    formData.append('id', device.id)
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', brand.id)
    formData.append('typeId', type.id)
    formData.append('info', JSON.stringify(info))
    //console.log("formData", ...formData)
    updateDevice(formData).then(data => onNote('Изменено'))
  }
  
  const newInfo = (deviceId, title, description) => {
    createInfo({ deviceId: deviceId, title: title, description: description }).then(data => {
      setTitle('');
      setDescription('');
      onNote('Записано')
    })
  }

  return (
    <div>
      <div className={styles.adminDevice}>
        <div className={styles.deviceId}>{device.id}</div>
        <MyMenu name={type.name} menu={types} sm={true} click={onType} />
        <MyMenu name={brand.name} menu={brands} sm={true} click={onBrand} />
        <MyInput sm={"true"} value={name} onChange={e => setName(e.target.value)} />
        <MyInput sm={"true"} type='text' value={price} onChange={e => setPrice(e.target.value)} />
        <input type='file' onChange={selectFile} />
        <MyButton name={'Info'} sm={true} onClick={()=> onInfoVisible(infoVisible)} />
        <MyButton name={'Изменить'} danger={true} sm={true} onClick={() => update()}/>
      </div>
      {infoVisible && 
        <div className={styles.info}>
          {info.map(info => 
            <InfoItem  key={info.id} info={info} add={addInfo} />
          )}
          <div className={styles.info__create} >
            <div>{device.id}</div>
            <MyInput sm={"true"} type='text' value={title} placeholder='Введите название свойства' onChange={e => setTitle(e.target.value)}/>
            <MyInput sm={"true"} type='text' value={description} placeholder='Введите описание свойства' onChange={e => setDescription(e.target.value)}/>
            <MyButton sm={true} danger={true} name={'Добавить'} onClick={() => newInfo(device.id, title, description)}/>
          </div>
        </div>
      }
    </div>
  );
};
export default AdminDevice;