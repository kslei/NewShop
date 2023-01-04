import React, { useContext, useState, useEffect } from 'react';
import MyButton from '../forms/MyButton';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import CreateDelivery from '../components/modals/CreateDelivery';
import { fetchBrands, fetchTypes, fetchDevices } from '../http/deviceAPI';
import AdminDevice from '../components/AdminDevice';
import MyInput from '../forms/MyInput';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import styles from '../styles/pages/Admin.module.scss';

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deliveryVisible, setDeliveryVisible] = useState(false);
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('');
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 100000).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedType, device.selectedBrand, device.page, device.limit])

  const brands = device.brands
  const types = device.types
  const searchDevice = device.devices.filter(
    device => device.name.toLowerCase().includes(search.toLowerCase())
  ) 
  const onNote = (text) => {
    setNote(text.toUpperCase());
    setTimeout(() => {
      setNote('')
    }, 2000);
  }

  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить тип' onClick={() => setTypeVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить бренд' onClick={() => setBrandVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить устройство' onClick={() => setDeviceVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить доставку' onClick={() => setDeliveryVisible(true)} /></div> 
      
      </div>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
      <CreateDelivery show={deliveryVisible} onHide={() => setDeliveryVisible(false)}/>
      
      <div>
        <div className={styles.title}>Корректировка товара</div>
        <div>
          <MyInput sm={"true"} type='text' value={search} placeholder='Поиск...' onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.adminDevice}>
          <div>deviceId</div>
          <div>Тип</div>
          <div>Бренд</div>
          <div>Наименование</div>
          <div>Цена</div>
          <div>Изображение</div>
          <div>Инфо</div>
          <div className={styles.note}>{note}</div>
        </div>
        {searchDevice.map(device =>
          <AdminDevice key={device.id} device={device} brands={brands} types={types} onNote={onNote}/>  
        )}
      </div>
    </div>
  </div>
  );
});
export default Admin;