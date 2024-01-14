import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import Pages from '../components/Pages';
import MyMenu from '../forms/MyMenu';
import { useTranslation } from 'react-i18next';
import styles from '../styles/pages/Shop.module.scss';

const Shop = observer(({searchQuery}) => {
  const {device} = useContext(Context);
  const {t, i18n} = useTranslation();
        
  useEffect (() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", 0, i18n.language).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.selectedType, device.selectedBrand, device.page, device.limit, i18n.language])
  
  useEffect(() => {
    if (searchQuery.length) {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.totalCount, "false", 0, i18n.language).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })}
  }, [searchQuery])

  const limitMenu = [
    {id: 1, name: 10, value: 10},
    {id: 2, name: 20, value: 20},
    {id: 3, name: 50, value: 50},
    {id: 4, name: `${t("All")}`, value: device.totalCount}
  ]
  
  const onLimit = (limit) => {
    device.setLimit(limit.value);
  }
  
  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.typeBar}>
        <TypeBar/>
      </div>
        <div className={styles.table}>
          <BrandBar />
          <DeviceList searchQuery={searchQuery} />
          <div className={styles.pagination}>
            <Pages />
            {t("Show")}:
            <MyMenu name={t("by")} menu={limitMenu} click={onLimit} rev={true}/>
          </div>          
        </div>
      </div> 
  </div>
  );
});
export default Shop;