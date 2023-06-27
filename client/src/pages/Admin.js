import React, { useContext, useState, useEffect } from 'react';
import MyButton from '../forms/MyButton';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import CreateDelivery from '../components/modals/CreateDelivery';
import { fetchBrands, fetchTypes, fetchDevices } from '../http/deviceAPI';
import AdminDevice from '../components/AdminDevice';
import AdminDelivery from '../components/AdminDelivery';
import MyInput from '../forms/MyInput';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchDelivery, removeDelivery } from '../http/deliveryAPI';
import styles from '../styles/pages/Admin.module.scss';

const Admin = observer(({setErrorMessage}) => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deliveryVisible, setDeliveryVisible] = useState(false);
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('');
  const {device} = useContext(Context)
  const [delivery, setDelivery] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    device.setNews(false)
    device.setDiscount(0)
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 100000, device.news, device.discount).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
    fetchDelivery().then(data => setDelivery(data))
  }, [device.selectedType, device.selectedBrand, device.page, device.limit])

  const brands = device.brands
  const types = device.types

  //search devices
  const searchDevice = device.devices.filter(
    device => device.name.toLowerCase().includes(search.toLowerCase())
  )

  //showing note
  const onNote = (text) => {
    setNote(text.toUpperCase());
    setTimeout(() => {
      setNote('')
    }, 2000);
  }

  //remove delivery
  const onRemove = (id) => {
    removeDelivery({id: id}).then(data => onNote('Удалено')).catch (e => {
      console.log(e.response.data.message);
      setErrorMessage(e)
    })
  }

  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить тип' onClick={() => setTypeVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить бренд' onClick={() => setBrandVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить товар' onClick={() => setDeviceVisible(true)} /></div>
        <div className={styles.buttons__btn}><MyButton danger={true} name='Добавить доставку' onClick={() => setDeliveryVisible(true)} /></div>
      </div>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} setErrorMessage={setErrorMessage}/>
      <CreateDelivery show={deliveryVisible} onHide={() => setDeliveryVisible(false)} setErrorMessage={setErrorMessage}/>
      <div className={styles.adminPanel}>
        <div className={styles.note}>{note}</div>
        <div className={styles.title}>Корректировка товара</div>
        <div>
          <MyInput sm={"true"} type='text' value={search} placeholder='Поиск...' onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={styles.adminDevice}>
          <div>id</div>
          <div>Тип</div>
          <div>Бренд</div>
          <div>Наименование</div>
          <div>Цена</div>
          <div>Скидка</div>
          <div>Кол-во</div>
          <div>New</div>
          <div>Изображение</div>
          <div>Медиа</div>
          <div>Инфо</div>
          <div></div>
        </div>
        {searchDevice.map(device =>
          <AdminDevice key={device.id} device={device} brands={brands} types={types} onNote={onNote} seterrormessage={setErrorMessage}/>  
        )}
        <div className={styles.title}>Корректировка доставки</div>
        <div className={styles.adminDelivery}>
          <div>id</div>
          <div>Наименование</div>
          <div></div>
        </div>
        {delivery.map(del => 
          <AdminDelivery key={del.id} delivery={del} remove={onRemove}/>
        )}
      </div>
    </div>
  </div>
  );
});
export default Admin;