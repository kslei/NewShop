import React, {useState} from 'react';
import styles from '../styles/components/DiscountList.module.scss';
import DiscountItem from './DiscountItem';
import { useTranslation } from 'react-i18next';

const  DiscountList = ({devices}) => {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);
  let num = 4;
  //multilanguage
  const {t, i18n} = useTranslation()
  //set number of devices from screen width
  if (window.innerWidth > 1399.98) { num = 4 } else {
    if (window.innerWidth > 767.98) { num = 3 } else {
      if (window.innerWidth > 480) { num = 2 } else {
        num = 1 } }
  } 
  
  devices = [... devices].sort((a,b)=>b.discount-a .discount)
  //first row
  let deviceRow = devices.slice(0, num)
  //other row
  let deviceVisible = devices.slice(num)
        
  return (
  <div className={styles.discountList}>
    <div className={styles.discountList__list} >
      {deviceRow.map((device, i) =>
        <DiscountItem key={device.id} device={device} width={100 / num} i={i} setheight={setHeight} />
      )}
    </div>
    <div className={styles.discountList__list} style={visible ? { height: `${(height+20) * (Math.ceil(devices.length / num) - 1)}px` } : { height: '0px'}}>
      {deviceVisible.map(device => 
        <DiscountItem key={device.id} device={device} width={100/num} />
      )}
    </div>
      {visible ? 
    <div className={styles.discountList__up} onClick={()=>{setVisible(false); window.scrollTo({left: 0, top: 350, behavior: 'smooth'})}}><div className={styles.icon__up}></div>{t("Collapse")}</div>
   :<div className={styles.discountList__down} onClick={()=>setVisible(true)}><div className={styles.icon__down}></div><div>{t("More")} <span style={{textTransform: "lowercase"}}>{t("Discounts")}</span></div></div>
    }
  </div>
  );
};
export default DiscountList;