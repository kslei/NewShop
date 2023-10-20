import React, { useContext } from 'react';
import DeviceItem from './DeviceItem';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import styles from '../styles/components/DeviceList.module.scss';

const DeviceList = observer(({searchQuery}) => {
  const { t } = useTranslation()
  const { device } = useContext(Context);
  //filtering devices based on search
  const searchDevice = device.devices.filter(
    device => device.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  //if search result false
  if (searchDevice.length === 0) {
    return (
    <div className={styles.message}>
        {t("Nothing found")}
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