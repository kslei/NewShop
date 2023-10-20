import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { DEVICE_ROUTE, SHOP_ROUTE } from '../utils/consts';
import SliderNews from '../components/SliderNews';
import Slider from '../components/Slider';
import DiscountList from '../components/DiscountList';
import TypeItem from '../components/TypeItem';
import BrandItem from '../components/BrandItem';
import styles from '../styles/pages/Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import i18n from '../i18n';

const Home = observer(({ searchQuery }) => {
  const {device} = useContext(Context);
  const { newdevice } = useContext(Context);
  const { discountdevice } = useContext(Context);
  const [translateX, setTranslateX] = useState('-100%');
  const navigate = useNavigate()
  //multilanguage
  const {t, i18n} = useTranslation()
  let lng = i18n.language

  let discountMax;
  if (discountdevice.discount.length !== 0) { discountMax = discountdevice.discount.slice().sort((a, b) => b.discount - a.discount)[0].discount }

  useEffect(() => { 
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", 0, lng).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
    device.setNews(true)
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.news, 0, lng).then(data => {
      newdevice.setNews(data)
      setTimeout(() => {
        setTranslateX(0);
      }, 50)
    })
    device.setDiscount(20)
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, "false", device.discount, lng).then(data => {
      discountdevice.setDiscount(data);
    })
  }, [device.selectedType, device.selectedBrand, device.page, device.limit, i18n.language])

  //go to shop when search
  useEffect(() => {
    if(searchQuery.length) navigate(DEVICE_ROUTE)
  }, [searchQuery])

  //set type & brand 
  const clickType = (type) => {
    device.setSelectedType(type)
    device.setSelectedBrand(-1)
    navigate(SHOP_ROUTE)
  }

  const clickBrand = (brand) => {
    device.setSelectedBrand(brand)
    device.setSelectedType(-1)
    navigate(SHOP_ROUTE)
  }

  return (
  <div>
    <div className={styles.wrapper} style={{ flexDirection: 'column' }}>
      {newdevice.news.length !== 0 &&
        <div className={styles.sectionTitle + ' ' + styles.red} style={{ transform: `translateX(${translateX})` }}>{t("New")}</div>
      }
      {newdevice.news.length !== 0 &&
        <SliderNews devices={newdevice.news.slice().sort((a, b) => b.id - a.id)} />
      }
      {discountdevice.discount.length !== 0 &&
        <div className={styles.sectionTitle + ' ' + styles.orange}>{t("Discounts")} {t("up_to")} {discountMax}%</div>
      }
      {discountdevice.discount.length !== 0 &&
        <DiscountList devices={discountdevice.discount} />
      }
      {newdevice.news.length === 0 && discountdevice.discount.length === 0 &&
        <Slider />
      }

      <div className={styles.sectionTitle}>{t("Categories")}</div>
      <div className={styles.type}>
        {device.types.map(type =>
          <TypeItem key={type.id} type={type} onclick={clickType} />
        )}
      </div>
      <div className={styles.sectionTitle}>{t("Brands")}</div>
      <div className={styles.type}>
        {device.brands.map(brand =>
          <BrandItem key={brand.id} brand={brand} onclick={clickBrand} />
        )}
      </div>
    </div>
  </div>
  );
});
export default Home;