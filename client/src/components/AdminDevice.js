import React, { useEffect, useState } from 'react';
import InfoItem from './InfoItem';
import MyInput from '../forms/MyInput';
import MyButton from '../forms/MyButton';
import MyMenu from '../forms/MyMenu';
import { fetchOneDevice, updateDevice, createInfo, updateImage, createImage, updateFrame, createFrame } from '../http/deviceAPI';
import styles from '../styles/components/AdminDevice.module.scss';
import DeviceMedia from './DeviceMedia';

const AdminDevice = ({device, brands, types, onNote}) => {
  const [name, setName] = useState(device.name)
  const [price, setPrice] = useState(device.price)
  const [discount, setDiscount] = useState(device.discount)
  const [number, setNumber] = useState(device.number)
  const [newDevice, setNewDevice] = useState(device.news)
  const [type, setType] = useState(device.type)
  const [brand, setBrand] = useState(device.brand)
  const [info, setInfo] = useState([])
  const [file, setFile] = useState(null)
  const [infoVisible, setInfoVisible] = useState(false)
  const [mediaVisible, setMediaVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  console.log(newDevice)
  
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
  const onMediaVisible = (mediaVisible) => {
    setMediaVisible(!mediaVisible)
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
    formData.append('discount', `${discount}`)
    formData.append('number', `${number}`)
    formData.append('news', newDevice)
    formData.append('img', file)
    formData.append('brandId', brand.id)
    formData.append('typeId', type.id)
    formData.append('info', JSON.stringify(info))
    updateDevice(formData).then(data => onNote('Изменено'))
  }

  const updateImg = (id) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('deviceId', device.id)
    formData.append('img', file)
    updateImage(formData).then(data => onNote('Изменено'))
  }
  const createImg = () => {
    const formData = new FormData()
    formData.append('deviceId', device.id)
    formData.append('img', file)
    createImage(formData).then(data => onNote('Записано'))
  }

  const updateFrm = (id) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('deviceId', device.id)
    formData.append('frame', file)
    updateFrame(formData).then(data => onNote('Изменено'))
  }
  const createFrm = () => {
    const formData = new FormData()
    formData.append('deviceId', device.id)
    formData.append('frame', file)
    createFrame(formData).then(data => onNote('Записано'))
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
        <MyMenu name={type.name} menu={types} sm={true} click={onType} close={false}/>
        <MyMenu name={brand.name} menu={brands} sm={true} click={onBrand} close={false}/>
        <MyInput sm={"true"} value={name} onChange={e => setName(e.target.value)} />
        <MyInput sm={"true"} type='text' value={price} onChange={e => setPrice(e.target.value)} />
        <MyInput sm={"true"} type='text' value={discount} onChange={e => setDiscount(e.target.value)} />
        <MyInput sm={"true"} type='text' value={number} onChange={e => setNumber(e.target.value)} />
        <input className={styles.input} id={device.id} type='checkbox' checked={newDevice} onChange={(e => setNewDevice(e.target.checked))} />
        <label className={styles.label} for={device.id}></label>
        <input type='file' onChange={selectFile} />
        <MyButton name={'Media'} sm={true} onClick={()=> onMediaVisible(mediaVisible)} />
        <MyButton name={'Info'} sm={true} onClick={()=> onInfoVisible(infoVisible)} />
        <MyButton name={'Изменить'} danger={true} sm={true} onClick={() => update()}/>
      </div>
      {mediaVisible &&
        <div className={styles.media}>
          <DeviceMedia device={device.device_frames} type={'frame'} select={selectFile} create={createFrm} update={updateFrm}/>
          <div className={styles.border}></div>
          <DeviceMedia device={device.device_images} type={'image'} select={selectFile} create={createImg} update={updateImg}/>
        </div>
      }
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