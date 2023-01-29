import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import Pages from '../components/Pages';
import MyMenu from '../forms/MyMenu';
import TypeItem from '../components/TypeItem';
import styles from '../styles/pages/Shop.module.scss';
import Slider from '../components/Slider';

const Shop = observer(({searchQuery}) => {
  const {device} = useContext(Context);
  useEffect (() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedType, device.selectedBrand, device.page, device.limit])
  
  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.totalCount).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [searchQuery])

  const limitMenu = [
    {id: 1, name: 10, value: 10},
    {id: 2, name: 20, value: 20},
    {id: 3, name: 50, value: 50},
    {id: 4, name: 'вce', value: device.totalCount}
  ]
  
  const onLimit = (limit) => {
    device.setLimit(limit.value);
  }
  
  const clickType = (type) => {
    device.setSelectedType(type)
  }
  
  return (
  <div className={styles.container}>
    {!device.selectedType.id && !searchQuery
    ? <div className={styles.wrapper} style={{flexDirection: 'column'}}>
      <Slider/>
        <div className={styles.type}>
          {device.types.map(type =>
            <TypeItem key={type.id} type={type} onclick={clickType} />
          )}
        </div>
      </div>
    : <div className={styles.wrapper}>
      <div className={styles.typeBar}>
        <TypeBar/>
      </div>
        <div className={styles.table}>
          <BrandBar />
          <DeviceList searchQuery={searchQuery} />
          <div className={styles.pagination}>
            <Pages />
            Показывать:
            <MyMenu name={'по'} menu={limitMenu} click={onLimit} rev={true}/>
          </div>          
        </div>
      </div> 
    }
    
  </div>
  );
});
export default Shop;