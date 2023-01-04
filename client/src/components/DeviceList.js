import React, { useContext } from 'react';
import DeviceItem from './DeviceItem';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import styles from '../styles/components/DeviceList.module.scss';

const DeviceList = observer(({searchQuery}) => {
  const { device } = useContext(Context);

  const searchDevice = device.devices.filter(
    device => device.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
    
  if (searchDevice.length === 0) {
    return (
    <div className={styles.message}>
      Ничего не найдено!
    </div>
    )
  }

  return (
  <div className={styles.deviceList}>
    {searchDevice.map(device => 
      <DeviceItem key={device.id} device={device}/>  
    )}
  </div>
  );
});
export default DeviceList;