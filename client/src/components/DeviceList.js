import React, { useContext } from 'react';
import DeviceItem from './DeviceItem';
import { Context } from '..';
import styles from '../styles/components/DeviceList.module.scss'
import { observer } from 'mobx-react-lite';

const DeviceList = observer(({searchQuery}) => {
  const { device } = useContext(Context);

  const searchDevice = device.devices.filter(
    device => device.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
  <div className={styles.deviceList}>
    {searchDevice.map(device => 
      <DeviceItem key={device.id} device={device}/>  
    )}
  </div>
  );
});
export default DeviceList;